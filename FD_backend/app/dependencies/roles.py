from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jose import jwt, JWTError
from app.core.security import SECRET_KEY, ALGORITHM

# This tells FastAPI to read token from Authorization header
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/login", auto_error=False)


def get_current_user(
    token_header: str = Depends(oauth2_scheme),
    token: str = None
):
    auth_token = token_header or token
    
    if not auth_token:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Not authenticated"
        )
        
    # Handle "Bearer " prefix if manually passed in query (optional safety)
    if auth_token.startswith("Bearer "):
        auth_token = auth_token.split(" ")[1]

    try:
        payload = jwt.decode(auth_token, SECRET_KEY, algorithms=[ALGORITHM])
        return payload
    except JWTError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired token"
        )


def role_required(roles: list | str):
    if isinstance(roles, str):
        roles = [roles]
    
    # Normalize roles to uppercase for case-insensitive comparison
    roles_normalized = [r.upper() if isinstance(r, str) else r for r in roles]

    def checker(user=Depends(get_current_user)):
        user_role = user.get("role")
        if not user_role:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Access denied"
            )
        
        # Normalize user role to uppercase for case-insensitive comparison
        user_role_normalized = user_role.upper() if isinstance(user_role, str) else user_role
        
        if user_role_normalized not in roles_normalized:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Access denied"
            )
        return user
    return checker

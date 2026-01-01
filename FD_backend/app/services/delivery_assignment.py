from sqlalchemy.orm import Session
from app.models.delivery_partner import DeliveryPartner

def assign_delivery_partner(db: Session):
    partner = (
        db.query(DeliveryPartner)
        .filter(DeliveryPartner.is_available == True)
        .first()
    )

    if not partner:
        return None

    partner.is_available = False
    db.commit()

    return partner

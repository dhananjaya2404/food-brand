def assign_delivery_partner(db):
    partner = db.query(DeliveryPartner)\
        .filter(DeliveryPartner.is_available == True)\
        .first()

    if not partner:
        raise Exception("No delivery partner available")

    partner.is_available = False
    db.commit()
    return partner.id

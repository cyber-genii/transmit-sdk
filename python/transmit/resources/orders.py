from typing import Any, Dict, List, Optional, TypedDict


class DeliveryLocationInput(TypedDict, total=False):
    address: str
    lat: float
    lng: float
    contact_name: str
    contact_email: str
    contact_phone: str
    contact_phone_secondary: str


class PackageDimensions(TypedDict):
    length: float
    width: float
    height: float


class PackageInput(TypedDict, total=False):
    package_id: str
    description: str
    quantity: int
    weight_kg: float
    dimensions_cm: PackageDimensions
    value: float
    fragile: bool
    supplier_info: Dict[str, str]


class CreateDeliveryOrderRequest(TypedDict, total=False):
    pickup: DeliveryLocationInput
    dropoff: DeliveryLocationInput
    vehicle_type: str
    delivery_type: str
    packages: List[PackageInput]
    package_weight_kg: float
    package_length_cm: float
    package_width_cm: float
    package_height_cm: float
    package_description: str
    package_value: float
    is_fragile: bool
    payment_method: str
    webhook_url: str
    external_reference: str


class CalculateOrderFareRequest(TypedDict, total=False):
    pickup: DeliveryLocationInput
    dropoff: DeliveryLocationInput
    delivery_type: str
    vehicle_type: str
    packages: List[PackageInput]
    package_weight_kg: float
    package_length_cm: float
    package_width_cm: float
    package_height_cm: float


class Orders:
    def __init__(self, client):
        self._client = client

    def calculate_fare(self, data: CalculateOrderFareRequest) -> Dict[str, Any]:
        return self._client.post("/api/v1/delivery-orders/calculate-fare", json=data)

    def create(self, data: CreateDeliveryOrderRequest) -> Dict[str, Any]:
        return self._client.post("/api/v1/delivery-orders", json=data)

    def list(self, params: Optional[Dict[str, Any]] = None) -> List[Dict[str, Any]]:
        return self._client.get("/api/v1/delivery-orders", params=params)

    def retrieve(self, order_id: str) -> Dict[str, Any]:
        return self._client.get(f"/api/v1/delivery-orders/{order_id}")

    def track(self, order_id: str) -> Dict[str, Any]:
        return self._client.get(f"/api/v1/delivery-orders/{order_id}/track")

    def cancel(self, order_id: str) -> None:
        self._client.post(f"/api/v1/delivery-orders/{order_id}/cancel")

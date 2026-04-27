from typing import Any, Dict, List


class Deliveries:
    def __init__(self, client):
        self._client = client

    def create(self, data: Dict[str, Any]) -> Dict[str, Any]:
        """Create a new delivery via API"""
        return self._client.post("/api/v1/api-deliveries", json=data)

    def list(self, params: Dict[str, Any] = None) -> List[Dict[str, Any]]:
        """List your API deliveries"""
        return self._client.get("/api/v1/api-deliveries", params=params)

    def retrieve(self, delivery_id: str) -> Dict[str, Any]:
        """Get delivery details by ID"""
        return self._client.get(f"/api/v1/api-deliveries/{delivery_id}")

    def quote(self, data: Dict[str, Any]) -> Dict[str, Any]:
        """Get delivery fare quote"""
        return self._client.post("/api/v1/api-deliveries/quote", json=data)

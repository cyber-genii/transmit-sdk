from typing import Any, Dict, List


class ApiKeys:
    def __init__(self, client):
        self._client = client

    def list(self) -> List[Dict[str, Any]]:
        """List your API keys"""
        return self._client.get("/api/v1/developers/api-keys")

    def create(self, data: Dict[str, Any]) -> Dict[str, Any]:
        """Generate a new API key"""
        return self._client.post("/api/v1/developers/api-keys", json=data)

    def retrieve(self, key_id: str) -> Dict[str, Any]:
        """Get API key details"""
        return self._client.get(f"/api/v1/developers/api-keys/{key_id}")

    def revoke(self, key_id: str) -> None:
        """Revoke API key"""
        self._client.post(f"/api/v1/developers/api-keys/{key_id}/revoke")

    def delete(self, key_id: str) -> None:
        """Delete API key"""
        self._client.delete(f"/api/v1/developers/api-keys/{key_id}")

    def get_usage(self, key_id: str) -> Dict[str, Any]:
        """Get API key usage stats"""
        return self._client.get(f"/api/v1/developers/api-keys/{key_id}/usage")

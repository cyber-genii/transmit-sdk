from typing import Any, Dict, Optional

import requests


class TransmitAPIError(Exception):
    """Exception raised for errors in the Transmit API."""

    def __init__(self, message, status_code=None, response=None):
        super().__init__(message)
        self.status_code = status_code
        self.response = response


class TransmitClient:
    def __init__(
        self,
        api_key: str,
        environment: str = "production",
        base_url: Optional[str] = None,
        timeout: int = 30,
    ):
        """
        Initialize the Transmit API Client.

        Args:
            api_key: Your Transmit API key.
            environment: 'production' or 'sandbox'. Defaults to 'production'.
            base_url: Optional override for the API base URL.
            timeout: Request timeout in seconds.
        """
        if not api_key:
            raise ValueError("API Key is required to initialize the Transmit SDK")

        self.api_key = api_key
        self.timeout = timeout

        if base_url:
            self.base_url = base_url.rstrip("/")
        else:
            if environment == "sandbox":
                self.base_url = "https://sandbox-api.transmit.com"
            else:
                self.base_url = "https://api.transmit.com"

        self.session = requests.Session()
        self.session.headers.update({
            "Authorization": f"Bearer {self.api_key}",
            "Content-Type": "application/json",
            "User-Agent": "Transmit-Python-SDK/1.0.0",
        })

    def _request(self, method: str, path: str, **kwargs) -> Any:
        url = f"{self.base_url}{path}"

        try:
            response = self.session.request(method, url, timeout=self.timeout, **kwargs)

            if not response.ok:
                error_message = f"API Request Error [{response.status_code}]"
                try:
                    error_data = response.json()
                    error_message = error_data.get(
                        "message", error_data.get("error", error_message)
                    )
                except ValueError:
                    error_message = response.text or error_message
                raise TransmitAPIError(
                    error_message, status_code=response.status_code, response=response
                )

            return response.json()
        except requests.exceptions.RequestException as e:
            raise TransmitAPIError(f"Network error: {str(e)}")

    def get(self, path: str, params: Optional[Dict[str, Any]] = None) -> Any:
        return self._request("GET", path, params=params)

    def post(self, path: str, json: Optional[Dict[str, Any]] = None) -> Any:
        return self._request("POST", path, json=json)

    def put(self, path: str, json: Optional[Dict[str, Any]] = None) -> Any:
        return self._request("PUT", path, json=json)

    def delete(self, path: str) -> Any:
        return self._request("DELETE", path)

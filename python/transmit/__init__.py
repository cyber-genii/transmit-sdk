from .client import TransmitAPIError, TransmitClient
from .resources.api_keys import ApiKeys
from .resources.deliveries import Deliveries
from .resources.sandbox import Sandbox
from .resources.vehicles import Vehicles
from .resources.webhooks import Webhooks


class Transmit:
    """Main Transmit SDK Client"""

    def __init__(self, api_key: str, **kwargs):
        self._client = TransmitClient(api_key=api_key, **kwargs)
        self.deliveries = Deliveries(self._client)
        self.api_keys = ApiKeys(self._client)
        self.webhooks = Webhooks(self._client)
        self.sandbox = Sandbox(self._client)
        self.vehicles = Vehicles(self._client)


__all__ = ["Transmit", "TransmitAPIError"]

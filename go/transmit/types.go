package transmit

type APIDeliveryRequest struct {
	SenderName         string  `json:"sender_name"`
	SenderPhone        string  `json:"sender_phone"`
	ReceiverName       string  `json:"receiver_name"`
	ReceiverPhone      string  `json:"receiver_phone"`
	PickupLatitude     float64 `json:"pickup_latitude"`
	PickupLongitude    float64 `json:"pickup_longitude"`
	PickupAddress      string  `json:"pickup_address"`
	DropoffLatitude    float64 `json:"dropoff_latitude"`
	DropoffLongitude   float64 `json:"dropoff_longitude"`
	DropoffAddress     string  `json:"dropoff_address"`
	PackageWeightKg    float64 `json:"package_weight_kg"`
	PackageLengthCm    float64 `json:"package_length_cm,omitempty"`
	PackageWidthCm     float64 `json:"package_width_cm,omitempty"`
	PackageHeightCm    float64 `json:"package_height_cm,omitempty"`
	PackageDescription string  `json:"package_description"`
	DeliveryType       string  `json:"delivery_type"`
	VehicleType        string  `json:"vehicle_type"`
	PaymentMethod      string  `json:"payment_method"`
}

type FareQuoteRequest struct {
	PickupAddress  string  `json:"pickup_address"`
	DropoffAddress string  `json:"dropoff_address"`
	VehicleType    string  `json:"vehicle_type"`
	PackageWeight  float64 `json:"package_weight"`
}

type CreateWebhookRequest struct {
	URL         string   `json:"url"`
	Events      []string `json:"events"`
	Secret      string   `json:"secret,omitempty"`
	Description string   `json:"description,omitempty"`
}

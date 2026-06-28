package transmit

type DeliveryLocationInput struct {
	Address               *string  `json:"address,omitempty"`
	Lat                   *float64 `json:"lat,omitempty"`
	Lng                   *float64 `json:"lng,omitempty"`
	ContactName           string   `json:"contact_name"`
	ContactEmail          *string  `json:"contact_email,omitempty"`
	ContactPhone          string   `json:"contact_phone"`
	ContactPhoneSecondary *string  `json:"contact_phone_secondary,omitempty"`
}

type PackageDimensions struct {
	Length float64 `json:"length"`
	Width  float64 `json:"width"`
	Height float64 `json:"height"`
}

type SupplierInfo struct {
	Name      *string `json:"name,omitempty"`
	Reference *string `json:"reference,omitempty"`
}

type PackageInput struct {
	PackageID     *string            `json:"package_id,omitempty"`
	Description   string             `json:"description"`
	Quantity      int                `json:"quantity,omitempty"`
	WeightKg      float64            `json:"weight_kg"`
	DimensionsCm  *PackageDimensions `json:"dimensions_cm,omitempty"`
	Value         float64            `json:"value,omitempty"`
	Fragile       bool               `json:"fragile,omitempty"`
	SupplierInfo  *SupplierInfo      `json:"supplier_info,omitempty"`
}

type CreateDeliveryOrderRequest struct {
	Pickup              DeliveryLocationInput `json:"pickup"`
	Dropoff             DeliveryLocationInput `json:"dropoff"`
	VehicleType         string                `json:"vehicle_type"`
	DeliveryType        string                `json:"delivery_type"`
	Packages            []PackageInput        `json:"packages,omitempty"`
	PackageWeightKg     *float64              `json:"package_weight_kg,omitempty"`
	PackageLengthCm     *float64              `json:"package_length_cm,omitempty"`
	PackageWidthCm      *float64              `json:"package_width_cm,omitempty"`
	PackageHeightCm     *float64              `json:"package_height_cm,omitempty"`
	PackageDescription  *string               `json:"package_description,omitempty"`
	PackageValue        *float64              `json:"package_value,omitempty"`
	IsFragile           *bool                 `json:"is_fragile,omitempty"`
	PaymentMethod       *string               `json:"payment_method,omitempty"`
	WebhookURL          *string               `json:"webhook_url,omitempty"`
	ExternalReference   *string               `json:"external_reference,omitempty"`
}

type CalculateOrderFareRequest struct {
	Pickup          DeliveryLocationInput `json:"pickup"`
	Dropoff         DeliveryLocationInput `json:"dropoff"`
	DeliveryType    string                `json:"delivery_type"`
	VehicleType     *string               `json:"vehicle_type,omitempty"`
	Packages        []PackageInput        `json:"packages,omitempty"`
	PackageWeightKg *float64              `json:"package_weight_kg,omitempty"`
	PackageLengthCm *float64              `json:"package_length_cm,omitempty"`
	PackageWidthCm  *float64              `json:"package_width_cm,omitempty"`
	PackageHeightCm *float64              `json:"package_height_cm,omitempty"`
}

// Deprecated: use CreateDeliveryOrderRequest
type APIDeliveryRequest = CreateDeliveryOrderRequest

// Deprecated: use CalculateOrderFareRequest
type FareQuoteRequest = CalculateOrderFareRequest

type CreateWebhookRequest struct {
	URL         string   `json:"url"`
	Events      []string `json:"events"`
	Secret      string   `json:"secret,omitempty"`
	Description string   `json:"description,omitempty"`
}

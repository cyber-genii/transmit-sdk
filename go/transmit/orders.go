package transmit

import (
	"encoding/json"
	"fmt"
)

type OrdersService struct {
	client *Client
}

func (s *OrdersService) CalculateFare(req *CalculateOrderFareRequest) (map[string]interface{}, error) {
	resp, err := s.client.sendRequest("POST", "/api/v1/delivery-orders/calculate-fare", req)
	if err != nil {
		return nil, err
	}
	var result map[string]interface{}
	err = json.Unmarshal(resp, &result)
	return result, err
}

func (s *OrdersService) Create(req *CreateDeliveryOrderRequest) (map[string]interface{}, error) {
	resp, err := s.client.sendRequest("POST", "/api/v1/delivery-orders", req)
	if err != nil {
		return nil, err
	}
	var result map[string]interface{}
	err = json.Unmarshal(resp, &result)
	return result, err
}

func (s *OrdersService) List() ([]map[string]interface{}, error) {
	resp, err := s.client.sendRequest("GET", "/api/v1/delivery-orders", nil)
	if err != nil {
		return nil, err
	}
	var result []map[string]interface{}
	err = json.Unmarshal(resp, &result)
	return result, err
}

func (s *OrdersService) Retrieve(id string) (map[string]interface{}, error) {
	path := fmt.Sprintf("/api/v1/delivery-orders/%s", id)
	resp, err := s.client.sendRequest("GET", path, nil)
	if err != nil {
		return nil, err
	}
	var result map[string]interface{}
	err = json.Unmarshal(resp, &result)
	return result, err
}

func (s *OrdersService) Track(id string) (map[string]interface{}, error) {
	path := fmt.Sprintf("/api/v1/delivery-orders/%s/track", id)
	resp, err := s.client.sendRequest("GET", path, nil)
	if err != nil {
		return nil, err
	}
	var result map[string]interface{}
	err = json.Unmarshal(resp, &result)
	return result, err
}

func (s *OrdersService) Cancel(id string) error {
	path := fmt.Sprintf("/api/v1/delivery-orders/%s/cancel", id)
	_, err := s.client.sendRequest("POST", path, nil)
	return err
}

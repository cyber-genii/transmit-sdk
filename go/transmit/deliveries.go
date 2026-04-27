package transmit

import (
	"encoding/json"
	"fmt"
)

type DeliveriesService struct {
	client *Client
}

func (s *DeliveriesService) Create(req *APIDeliveryRequest) (map[string]interface{}, error) {
	resp, err := s.client.sendRequest("POST", "/api/v1/api-deliveries", req)
	if err != nil {
		return nil, err
	}

	var result map[string]interface{}
	err = json.Unmarshal(resp, &result)
	return result, err
}

func (s *DeliveriesService) List() ([]map[string]interface{}, error) {
	resp, err := s.client.sendRequest("GET", "/api/v1/api-deliveries", nil)
	if err != nil {
		return nil, err
	}

	var result []map[string]interface{}
	err = json.Unmarshal(resp, &result)
	return result, err
}

func (s *DeliveriesService) Retrieve(id string) (map[string]interface{}, error) {
	path := fmt.Sprintf("/api/v1/api-deliveries/%s", id)
	resp, err := s.client.sendRequest("GET", path, nil)
	if err != nil {
		return nil, err
	}

	var result map[string]interface{}
	err = json.Unmarshal(resp, &result)
	return result, err
}

func (s *DeliveriesService) Quote(req *FareQuoteRequest) (map[string]interface{}, error) {
	resp, err := s.client.sendRequest("POST", "/api/v1/api-deliveries/quote", req)
	if err != nil {
		return nil, err
	}

	var result map[string]interface{}
	err = json.Unmarshal(resp, &result)
	return result, err
}

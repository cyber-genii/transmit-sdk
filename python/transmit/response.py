from typing import Any, List, Optional, Tuple, TypeVar

T = TypeVar("T")


def unwrap_data(raw: Any) -> Any:
    if isinstance(raw, dict) and "success" in raw and "data" in raw:
        return raw.get("data")
    return raw


def unwrap_list(raw: Any) -> List[Any]:
    data = unwrap_data(raw)
    if isinstance(data, list) and data and isinstance(data[0], list):
        return data[0]
    if isinstance(data, list):
        return data
    return []


def unwrap_paginated(raw: Any) -> Tuple[List[Any], Optional[int]]:
    data = unwrap_data(raw)
    if isinstance(data, list) and data and isinstance(data[0], list):
        total = data[1] if len(data) > 1 and isinstance(data[1], int) else None
        return data[0], total
    return unwrap_list(raw), None

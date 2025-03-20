import pytest
from fastapi.testclient import TestClient
from backend.main import app

client = TestClient(app)

def test_execute_go_code():
    # Test valid Go code
    response = client.post("/api/go/execute", json={"code": "package main\n\nfunc main() {\n\tprintln(\"Hello, World!\")\n}"})
    assert response.status_code == 200
    assert "Hello, World!" in response.json()["output"]

    # Test invalid Go code
    response = client.post("/api/go/execute", json={"code": "invalid go code"})
    assert response.status_code == 200
    assert response.json()["success"] is False
    assert "error" in response.json()

def test_get_go_concept():
    # Test existing concept
    response = client.get("/api/go/concepts/variables")
    assert response.status_code == 200
    assert "description" in response.json()
    assert "example" in response.json()

    # Test non-existent concept
    response = client.get("/api/go/concepts/nonexistent")
    assert response.status_code == 200
    assert "error" in response.json()
from fastapi import APIRouter
from .handlers import execute_go_code, get_go_concept, CodeExecutionRequest

router = APIRouter(prefix="/go", tags=["Go Learning"])

@router.post("/execute")
async def execute_code(request: CodeExecutionRequest):
    """
    Execute Go code and return the output
    """
    return await execute_go_code(request)

@router.get("/concepts/{concept}")
async def get_concept(concept: str):
    """
    Get explanation and examples for a Go programming concept
    """
    return await get_go_concept(concept)
import subprocess
import logging
from typing import Dict
from pathlib import Path
from tempfile import NamedTemporaryFile
from pydantic import BaseModel

# Configure logging
logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

class CodeExecutionRequest(BaseModel):
    code: str

GO_CONCEPTS = {
    "variables": {
        "description": "Variables in Go are explicitly declared and used by the compiler to check type-correctness of function calls.",
        "example": "var x int = 10"
    },
    "functions": {
        "description": "Functions in Go are declared using the func keyword and can have multiple return values.",
        "example": "func add(a int, b int) int {\n    return a + b\n}"
    },
    # Add more concepts as needed
}

async def execute_go_code(request: CodeExecutionRequest) -> Dict:
    """
    Execute Go code using the Go compiler and return the output
    """
    code = request.code
    try:
        logger.debug(f"Executing Go code:\n{code}")
        
        with NamedTemporaryFile(suffix=".go", delete=True) as temp_file:
            temp_file.write(code.encode())
            temp_file.flush()
            
            logger.debug(f"Temporary file created at: {temp_file.name}")
            
            result = subprocess.run(
                ["go", "run", temp_file.name],
                capture_output=True,
                text=True,
                timeout=5
            )
            
            logger.debug(f"Go execution result:\nstdout: {result.stdout}\nstderr: {result.stderr}\nreturncode: {result.returncode}")
            
            # Combine stdout and stderr for output
            output = result.stdout + result.stderr
            
            return {
                "output": output.strip(),
                "error": "" if result.returncode == 0 else result.stderr,
                "success": result.returncode == 0
            }
    except subprocess.TimeoutExpired:
        logger.error("Execution timed out")
        return {"error": "Execution timed out", "success": False}
    except Exception as e:
        logger.error(f"Error executing Go code: {str(e)}")
        return {"error": str(e), "success": False}

async def get_go_concept(concept: str) -> Dict:
    """
    Get explanation and examples for a Go programming concept
    """
    concept = concept.lower()
    if concept in GO_CONCEPTS:
        return GO_CONCEPTS[concept]
    return {"error": "Concept not found"}
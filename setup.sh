#!/bin/bash

set -e

CLEAN=false
UPDATE=false

# Parse command line arguments
while [[ $# -gt 0 ]]; do
  case $1 in
    --clean)
      CLEAN=true
      shift
      ;;
    --update)
      UPDATE=true
      shift
      ;;
    *)
      echo "Unknown option: $1"
      echo "Usage: ./setup.sh [--clean] [--update]"
      exit 1
      ;;
  esac
done

# Check if UV is installed
if ! command -v uv &> /dev/null; then
    echo "UV is not installed. Please install it first."
    echo "On macOS: brew install pipx && pipx ensurepath && pipx install uv"
    echo "Or: curl -sSf https://astral.sh/uv/install.sh | sh"
    exit 1
fi

# Clean if requested
if [ "$CLEAN" = true ]; then
    echo "Cleaning environment..."
    rm -rf .venv
    if [ "$UPDATE" = true ]; then
        echo "Removing uv.lock for update..."
        rm -f uv.lock
    fi
fi

# Create virtual environment
if [ ! -d ".venv" ]; then
    echo "Creating virtual environment..."
    uv venv .venv
fi

# Activate virtual environment
source .venv/bin/activate

# Install dependencies
if [ "$UPDATE" = true ] || [ ! -f "uv.lock" ]; then
    echo "Installing dependencies and updating uv.lock..."
    uv pip install -e .
else
    echo "Installing dependencies from uv.lock..."
    uv pip install -e .
fi

# Create .env file if it doesn't exist
if [ ! -f ".env" ]; then
    echo "Creating .env file..."
    cp backend/.env.example .env
    echo "# Python Backend Settings" >> .env
    echo "REDIS_HOST=localhost" >> .env
    echo "REDIS_PORT=6379" >> .env
    echo "REDIS_DB=0" >> .env
    echo "REDIS_PASSWORD=" >> .env
    echo "REDIS_ENABLED=True" >> .env
fi

echo "Setup complete! Activate the virtual environment with: source .venv/bin/activate"
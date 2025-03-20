# Orixa-BE Package Management with UV

This project uses [UV](https://github.com/astral-sh/uv) for Python package management. UV is a fast and reliable package manager that's compatible with the Python ecosystem while being significantly faster than pip or Poetry.

## Getting Started

### Prerequisites

- Python 3.11 or higher
- UV package manager v0.5.24 or higher (see installation instructions below)

### Installing UV

#### On macOS

```bash
# Using Homebrew (recommended)
brew install pipx && pipx ensurepath && pipx install uv

# Or using curl
curl -sSf https://astral.sh/uv/install.sh | sh
```

#### On Windows

```powershell
# Using PowerShell
irm 'https://astral.sh/uv/install.ps1' | iex
```

## Project Setup

We provide a setup script to make it easy to get started:

```bash
# First time setup (generates uv.lock file if it doesn't exist)
./setup.sh

# To clean and rebuild the environment
./setup.sh --clean

# To force update dependencies and regenerate uv.lock
./setup.sh --update
```

The setup script will:
1. Create a virtual environment using UV
2. Install all dependencies from pyproject.toml
3. Generate or use the existing uv.lock file for deterministic builds
4. Create a .env file if one doesn't exist

## Manual Setup

If you prefer to set things up manually:

```bash
# Create a virtual environment
uv venv .venv

# Activate the virtual environment
source .venv/bin/activate  # On Unix/macOS
.venv\Scripts\activate     # On Windows

# Install dependencies (this will generate uv.lock if it doesn't exist)
uv pip install -e .
```

This approach installs the project in editable mode, which means:
1. Dependencies are read directly from pyproject.toml
2. The uv.lock file is generated automatically if it doesn't exist
3. The uv.lock file contains exact versions of all dependencies (including transitive dependencies)
4. Future `uv add` and `uv remove` commands will properly update both files

## Managing Dependencies

UV provides a modern way to manage dependencies through the `pyproject.toml` file and the `uv.lock` file.

### Project Dependencies

The project currently requires these key dependencies:

```
fastapi         - Web framework
uvicorn         - ASGI server
pydantic        - Data validation
pydantic-settings - Settings management
redis           - Caching system
google-analytics-data - GA4 API client
pandas          - Data processing
```

For testing:
```
pytest          - Testing framework
httpx           - HTTP client for testing
```

### Adding New Dependencies

To add a new dependency to the project:

```bash
# First activate your virtual environment
source .venv/bin/activate

# Add a regular dependency (will update both pyproject.toml and uv.lock)
uv add <package_name>

# Example:
uv add requests
```

For development dependencies:

```bash
# Add a development dependency
uv add --dev <package_name>

# Example:
uv add --dev pytest httpx
```

### Removing Dependencies

To remove a dependency:

```bash
uv remove <package_name>
```

### Updating Dependencies

If you need to update all dependencies to their latest compatible versions:

```bash
./setup.sh --update
```

## Committing Changes

After adding or removing dependencies, you **must** commit both the `pyproject.toml` and `uv.lock` files to version control:

```bash
git add pyproject.toml uv.lock
git commit -m "Add/remove <package_name> dependency"
```

The `uv.lock` file ensures everyone on the team has the exact same dependency versions, providing reproducible builds across all environments.

## Testing 

### Testing GA4 Connection

After setting up the environment, you can test the GA4 connection:

```bash
python test_ga4_connection.py
```

Make sure your `.env` file is properly configured with:
- `GA4_SERVICE_ACCOUNT_FILE`: Path to the service account JSON file
- `GA4_PROPERTY_ID`: Your GA4 property ID

### Running Dashboard Tests

For comprehensive dashboard testing, we provide a dedicated test runner:

```bash
# Run all dashboard tests (unit + integration)
python test/run_dashboard_tests.py

# Run only unit tests (no Redis required)
python test/run_dashboard_tests.py --unit-only

# Run only integration tests (Redis required)
python test/run_dashboard_tests.py --integration-only
```

The test runner provides:
- Automatic Redis cache clearing before and after tests
- Detailed test reports with timing information
- Graceful degradation when Redis is unavailable
- Better handling of async tests

### Running All Tests

For running the entire test suite:

```bash
# Run all tests
python -m pytest

# Run specific test file
python -m pytest test/test_dashboard.py

# Run tests with verbose output
python -m pytest -v
```

### Required Test Dependencies

The following packages are required for running tests:

```bash
# Install test dependencies
uv add --dev pytest pytest-asyncio httpx
```

### Redis Setup for Tests

Redis is required for dashboard caching functionality and complete integration tests. For running tests without a Redis server available, the tests will gracefully handle Redis connection failures, but for full testing:

```bash
# Install Redis server (macOS)
brew install redis

# Start Redis server locally
redis-server

# Or use Docker
docker run -p 6379:6379 redis:alpine
```

Configure Redis connection in your `.env` file:
```
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_DB=0
REDIS_PASSWORD=  # Leave empty if no password
REDIS_ENABLED=True
```

## Troubleshooting

If you encounter issues with dependencies:

1. Check that you have the correct version of UV installed (v0.5.24 or higher)
2. Try running `./setup.sh --clean` to rebuild the environment from scratch
3. Ensure your pyproject.toml file uses the standard PEP format (not Poetry format)
4. Make sure both pyproject.toml and uv.lock are committed to version control

## Best Practices

- Always use `uv add` and `uv remove` to manage dependencies instead of manually editing the pyproject.toml file
- Always commit both `pyproject.toml` and `uv.lock` files after any dependency changes
- Run `./setup.sh` after pulling changes from the repository to ensure your environment is up to date
- Use virtual environments to isolate project dependencies

<?xml version="1.0" encoding="UTF-8"?>
<guide title="UV Package Management for Python on macOS: Commands and Definitions">
  <introduction>
    <installation>
      <title>Installation (macOS)</title>
      <paragraph>Install UV using pipx (recommended) or via curl.  Pipx isolates UV, preventing conflicts.</paragraph>
      <example>
        <description>Install via pipx:</description>
        <code>brew install pipx && pipx ensurepath && pipx install uv</code>
      </example>
      <example>
        <description>Install via curl (less recommended):</description>
        <code>curl -sSf https://astral.sh/uv/install.sh | sh</code>
      </example>
    </installation>
    <important_note>
      <title>Important: Migrate from Poetry</title>
      <paragraph>If you have a `poetry.lock` file, remove it. UV uses a standard `pyproject.toml` and its own `uv.lock` for dependency management.  Migrate your `pyproject.toml` to a standard format (see example in Advanced Usage).</paragraph>
    </important_note>
  </introduction>

  <basic_usage>
    <creating_virtual_environments>
      <title>Creating Virtual Environments</title>
      <command>uv venv <venv_name></command>
      <definition>Creates a new virtual environment.</definition>
      <example>
        <description>Create a virtual environment named ".venv":</description>
        <code>uv venv .venv</code>
      </example>
      <example>
        <description>Activate the virtual environment (zsh):</description>
        <code>source .venv/bin/activate</code>
      </example>
    </creating_virtual_environments>

    <installing_packages>
      <title>Installing Packages (Generally Not Needed Directly)</title>
      <paragraph>While `uv pip install` can install packages, it's best practice to manage dependencies via `uv add` and your `pyproject.toml` file.</paragraph>
      <command>uv pip install <package_name> [package2 package3...]</command>
      <definition>Installs one or more packages directly. Use sparingly; prefer `uv add`.</definition>
      <example>
        <description>Install the 'requests' package (direct install, less preferred):</description>
        <code>uv pip install requests</code>
      </example>
      <example>
        <description>Install from a requirements.txt file (consider migrating to pyproject.toml):</description>
        <code>uv pip install -r requirements.txt</code>
      </example>
       <example>
        <description>Install a specific version (direct install, less preferred):</description>
        <code>uv pip install requests==2.28.1</code>
      </example>
    </installing_packages>

    <uninstalling_packages>
      <title>Uninstalling Packages (Generally Not Needed Directly)</title>
      <paragraph>While `uv pip uninstall` can uninstall packages, it's best practice to remove dependencies via `uv remove` and your `pyproject.toml` file.</paragraph>
      <command>uv pip uninstall <package_name> [package2 package3...]</command>
      <definition>Uninstalls one or more packages directly. Use sparingly; prefer `uv remove`.</definition>
      <example>
        <description>Uninstall the 'requests' package (direct uninstall, less preferred):</description>
        <code>uv pip uninstall requests</code>
      </example>
    </uninstalling_packages>

    <listing_packages>
      <title>Listing Packages</title>
      <command>uv pip list</command>
      <definition>Lists installed packages in the current virtual environment.</definition>
      <example>
        <description>List all installed packages:</description>
        <code>uv pip list</code>
      </example>
    </listing_packages>

    <running_python_code>
      <title>Running Python Code</title>
      <command>uv python <script_name.py></command>
      <definition>Runs a Python script using the UV-managed Python interpreter.</definition>
      <example>
        <description>Run the 'hello.py' script:</description>
        <code>uv python hello.py</code>
      </example>
    </running_python_code>
  </basic_usage>

  <advanced_usage>
    <managing_dependencies>
      <title>Managing Dependencies with pyproject.toml</title>
      <paragraph>UV integrates with a standard `pyproject.toml` file for declarative dependency management. This approach guarantees that all your dependencies are managed in one place</paragraph>
      <example>
        <description>Example pyproject.toml file:</description>
        <code>
          [project]
          name = "my-project"
          version = "0.1.0"
          dependencies = [
            "requests",
            "fastapi"
          ]

          [project.optional-dependencies]
          dev = [
            "pytest",
            "mypy"
          ]

          [build-system]
          requires = ["hatchling"]
          build-backend = "hatchling.build"
        </code>
      </example>
      <dependency_management_commands>
        <command>uv add <package_name> [--dev]</command>
        <definition>Adds a package to `pyproject.toml` dependencies.  `--dev` adds it as a development dependency.</definition>
        <example>
          <description>Add 'pytest' as a development dependency:</description>
          <code>uv add pytest --dev</code>
        </example>
        <command>uv remove <package_name></command>
        <definition>Removes a package from `pyproject.toml` dependencies.</definition>
        <example>
          <description>Remove 'pytest':</description>
          <code>uv remove pytest</code>
        </example>
      </dependency_management_commands>
    </managing_dependencies>

    <updating_dependencies>
        <title>Updating Dependencies</title>
        <paragraph>To update dependencies to their latest compatible versions, use `uv pip update`</paragraph>
        <command>uv pip update</command>
        <definition>Updates packages to their latest compatible versions as specified in `pyproject.toml`.</definition>
        <example>
          <description>Update all packages:</description>
          <code>uv pip update</code>
        </example>
    </updating_dependencies>
  </advanced_usage>

  <uv_lock>
      <title>Understanding and Using uv.lock</title>
      <paragraph>UV creates (or updates) a `uv.lock` file to record the *exact* versions of all dependencies (including transitive dependencies).  **This file is critical for reproducible builds.**  Always commit `uv.lock` to version control.</paragraph>
      <example>
        <description>Example uv.lock file (shortened):</description>
        <code>
        [[package]]
        name = "requests"
        version = "2.31.0"
        dependencies = { "certifi" = ">=2017.4.17" }
        </code>
      </example>
  </uv_lock>

  <best_practices>
    <title>Best Practices for Reproducible Builds</title>
    <version_control>
      <paragraph>**Crucially, commit *both* `pyproject.toml` and `uv.lock` to version control (e.g., Git).** This ensures everyone on the project uses the exact same dependency versions.</paragraph>
    </version_control>
    <dependency_management>
        <paragraph>Always use `uv add` and `uv remove` to manage dependencies. Avoid manually editing the `pyproject.toml` file directly.</paragraph>
    </dependency_management>
  </best_practices>

  <troubleshooting>
      <title>Troubleshooting</title>
      <paragraph>If you encounter issues:</paragraph>
      <item>Ensure you're using the latest version of UV: `pipx upgrade uv`</item>
      <item>Check for dependency conflicts in your `pyproject.toml`.</item>
      <item>If builds fail after pulling changes, try running `uv pip install` to synchronize with the `uv.lock` file.</item>
  </troubleshooting>
</guide>
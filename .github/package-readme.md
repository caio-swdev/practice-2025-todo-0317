# Todo App Container Image

This package contains the container image for the Todo application.

## Usage

To pull the latest version:

```bash
docker pull ghcr.io/caio-swdev/practice-2025-todo-0317:latest
```

To pull a specific version:

```bash
docker pull ghcr.io/caio-swdev/practice-2025-todo-0317:<commit-sha>
```

## Tags

- `latest`: The most recent version from the master branch
- `<commit-sha>`: Specific version tied to a Git commit

## Security

This image includes:

- Provenance attestation
- Software Bill of Materials (SBOM)
- Container signing

## Environment Variables

- `NEXT_PUBLIC_APP_VERSION`: The version of the application (set automatically)

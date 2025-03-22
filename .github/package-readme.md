# Todo App Container

This container image contains the Todo application built with Next.js.

## Usage

```bash
# Pull the latest image
docker pull ghcr.io/caio-swdev/practice-2025-todo-0317:latest

# Run the container
docker run -p 3000:3000 ghcr.io/caio-swdev/practice-2025-todo-0317:latest
```

## Tags

- `latest`: The most recent build from the master branch
- `<commit-sha>`: Specific version tied to a commit

## Environment Variables

- `NEXT_PUBLIC_APP_VERSION`: The version/commit SHA of the application

## Security

This image includes:

- Provenance attestation
- Software Bill of Materials (SBOM)
- Container signing

#!/bin/bash
set -e  # Exit on error

REPO="johnwlck"
TAG="latest"
PROJECT_ROOT="$(cd "$(dirname "$0")" && pwd)"

echo "📁 Project root: $PROJECT_ROOT"

# Check required files
check_files() {
    echo "🔍 Verifying required files..."

    [ -f "$PROJECT_ROOT/LMS-react/package.json" ] || { echo "❌ LMS-react/package.json missing!"; exit 1; }
    [ -f "$PROJECT_ROOT/LMS/requirements.txt" ] || { echo "❌ LMS/requirements.txt missing!"; exit 1; }
    [ -f "$PROJECT_ROOT/docker-compose.yml" ] || { echo "❌ docker-compose.yml missing!"; exit 1; }

    echo "✅ All required files are present."
}

# Build and push Docker images
build_service() {
    local name="$1"
    local path="$2"
    local image="$REPO/lms-$name:$TAG"
    local dockerfile="$PROJECT_ROOT/$path/Dockerfile"

    echo -e "\n🚧 Building $name from $dockerfile"
    docker build -t "$image" -f "$dockerfile" "$PROJECT_ROOT/$path"

    echo "📤 Pushing image: $image"
    docker push "$image" || echo "⚠️  Warning: Push failed for $image"
}

# Run checks
check_files

# Build frontend and backend
build_service "frontend" "LMS-react"
build_service "backend" "LMS"

# Start containers
echo -e "\n🚀 Starting containers using docker-compose..."
docker-compose -f "$PROJECT_ROOT/docker-compose.yml" up -d --build

echo "✅ Deployment complete."

import { isRouteErrorResponse, useRouteError } from '@remix-run/react';
import { Card } from '~/components/ui/card';

export default function GeneralErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <div className="container mx-auto flex h-full items-center justify-center p-4">
        <Card className="w-full max-w-lg overflow-hidden rounded-lg bg-white shadow-md">
          <div className="p-4">
            <h1 className="mb-2 text-3xl font-semibold text-red-600">
              {error.status} {error.statusText}
            </h1>
            <p className="mb-4 text-lg text-gray-800">{error.data}</p>
          </div>
        </Card>
      </div>
    );
  } else if (error instanceof Error) {
    return (
      <div className="container mx-auto flex h-full items-center justify-center p-4">
        <Card className="w-full max-w-lg overflow-hidden rounded-lg bg-white shadow-md">
          <div className="p-4">
            <h1 className="mb-2 text-3xl font-semibold text-red-600">Error</h1>
            <p className="mb-4 text-lg text-gray-800">{error.message}</p>
            <p className="mb-2 text-base text-gray-700">Stack trace:</p>
            <pre className="overflow-x-auto rounded bg-gray-100 p-2 text-sm text-gray-900">
              {error.stack}
            </pre>
          </div>
        </Card>
      </div>
    );
  } else {
    return (
      <h1 className="mb-2 text-3xl font-semibold text-red-600">
        Unknown Error
      </h1>
    );
  }
}

import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient } from '@tanstack/react-query';

import { IntlProvider } from 'react-intl';

import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';

import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister';

import { createRouter, RouterProvider } from '@tanstack/react-router';

import { messages } from './locales/messages/index';
import { LOCALES } from './locales/constants';

import { routeTree } from './routeTree.gen';

import './index.css';
import { isDev } from './lib/utils/vite';
import { TooltipProvider } from './components/Tooltip';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace FormatjsIntl {
    interface Message {
      ids: keyof (typeof messages)['en-us'];
    }
  }
}

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // eslint-disable-next-line no-magic-numbers
      gcTime: 1000 * 60 * 30, // 30 minutes,
      // eslint-disable-next-line no-magic-numbers
      staleTime: 1000 * 60 * 30, // 30 minutes,
    },
  },
});

const persister = createSyncStoragePersister({
  storage: isDev ? window.sessionStorage : window.localStorage,
});

const currentMessages = messages[LOCALES.EN_US];

const router = createRouter({ routeTree });

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{ persister }}
    >
      <IntlProvider
        messages={currentMessages}
        locale={LOCALES.EN_US}
        defaultLocale={LOCALES.EN_US}
      >
        <TooltipProvider>
          <RouterProvider router={router} />
        </TooltipProvider>
      </IntlProvider>
    </PersistQueryClientProvider>
  </React.StrictMode>,
);

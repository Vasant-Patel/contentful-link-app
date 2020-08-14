import React, { useEffect, useState } from 'react';
import { AppExtensionSDK } from 'contentful-ui-extensions-sdk';
import * as R from 'ramda';
import '@contentful/forma-36-fcss/dist/styles.css';

// Use components from Contentful's design system, Forma 36: https://ctfl.io/f36
import { EmptyState, Button } from '@contentful/forma-36-react-components';

export default function App({ sdk }: { sdk: AppExtensionSDK }) {
  const [error, setError] = useState<string>();
  const _link = (R.propOr(null, 'link', sdk.parameters.installation) as unknown) as string;
  const [link, setLink] = useState(_link);

  useEffect(() => {
    navigateToLink();
  }, []);

  const navigateToLink = () => {
    onOpenItem();
  };

  if (error) {
    return (
      <EmptyState
        descriptionProps={{
          text: error,
        }}
        headingProps={{
          text: 'Oops, Something Went Wrong',
        }}
      />
    );
  }

  const onOpenItem = () => {
    if (!link) {
      setError('Please set valid contentful link via Manage Apps => Configure');
      return;
    }

    window.open(link, '_blank');
  };

  console.log('OK');
  return (
    <EmptyState
      className=""
      descriptionProps={{
        text: '',
      }}
      headingProps={{
        text: 'Open link again?',
      }}>
      <Button
        buttonType="primary"
        onClick={() => onOpenItem()}
        disabled={false}
        indicateDropdown={false}
        isFullWidth={false}
        loading={false}
        type="button">
        Open link
      </Button>
    </EmptyState>
  );
}

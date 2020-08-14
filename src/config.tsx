import React, { useEffect, useState } from 'react';
import { AppExtensionSDK } from 'contentful-ui-extensions-sdk';
import * as R from 'ramda';
// Use components from Contentful's design system, Forma 36: https://ctfl.io/f36
import { TextField } from '@contentful/forma-36-react-components';

interface State {
  link: string;
}

export default function Config({ sdk }: { sdk: AppExtensionSDK }) {
  const [link, setLink] = useState('');

  const configure = () => {
    return {
      // Parameters to be persisted as the app configuration.
      parameters: link ? { link } : { link: '' },
    };
  };

  const onTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const updatedValue = e.target.value;
    setLink(updatedValue);
  };

  useEffect(() => {
    sdk.app.onConfigure(configure);
  }, [link]);

  useEffect(() => {
    // Ready to display our app (end loading state).
    sdk.app.getParameters().then((parameters) => {
      const link = (R.propOr('', 'link', parameters || {}) as unknown) as string;
      setLink(link);
      sdk.app.setReady();
    });
  }, []);

  return (
    <div style={{ margin: 50 }}>
      <TextField
        name="linkInput"
        id="linkInput"
        value={link}
        onChange={onTextChange}
        labelText="Contentful Link"></TextField>
    </div>
  );
}

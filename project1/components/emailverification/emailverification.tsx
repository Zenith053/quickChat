
import * as React from 'react';

export interface EmailTemplateProps {
  firstName: string;
  code: string,
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  firstName,code
}) => (
  <div>
    <h1>Welcome, {firstName}! Your verification code is {code}</h1>
  </div>
);

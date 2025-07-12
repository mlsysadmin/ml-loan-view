import { readFileSync } from 'fs';
import path from 'path';

export function getSmsMessage(params: {
  firstName: string;
  lastName: string;
  loanType: string;
  ref: string;
}) {
  const templatePath = path.join(process.cwd(), 'templates', 'LoanCutomerSMSTemplate.txt');
  let template = readFileSync(templatePath, 'utf-8');

  template = template.replace('{{firstName}}', capitalize(params.firstName));
  template = template.replace('{{lastName}}', capitalize(params.lastName));
  template = template.replace('{{loanType}}', capitalize(params.loanType));
  template = template.replace('{{ref}}', params.ref);

  return template;
}

function capitalize(name: string) {
  return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
}

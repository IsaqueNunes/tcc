type Field = {
  fieldContent: string,
  fieldName: string
}

export function createErrorMessage(fields: Field[]) {
  const errorFieldNames: string[] = [];
  fields.forEach(field => {
    if (field.fieldContent === '') {
      errorFieldNames.push(field.fieldName);
    }
  });
  const finalErrorMessage: string = errorFieldNames.join(' e ');
  return 'O ' + finalErrorMessage + (errorFieldNames.length > 1 ? ' são obrigatórios.' : ' é obrigatório.');
}

export function convertDate(data: string): string {
  const date = new Date(data).toLocaleDateString();
  const time = new Date(data).toLocaleTimeString('pt-br');

  return `${date} às ${time}`;
}



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



export function greetingToTimeOfDay() {
  const brazilHour: number = currentTimeFromBrazil().getHours();

  if (brazilHour >= 6 && brazilHour <= 12) {
    return 'Bom dia';
  } else if (brazilHour >= 12 && brazilHour <= 18) {
    return 'Boa tarde';
  } else {
    return 'Boa noite';
  }
}

export function currentTimeFromBrazil(): Date {
  var date = new Date();
  var utcTime = date.getTime() + (date.getTimezoneOffset() * 60000);
  var timeOffsetFromBrazil = -4;

  const brazilTime: Date = new Date(utcTime + (3600000 * timeOffsetFromBrazil));

  return brazilTime;
}



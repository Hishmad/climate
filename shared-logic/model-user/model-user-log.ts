
export class ModelUserLog {


  constructor(
    public id: string = '',
    public idUser: string = '',
    public sourceUrl: string = '',
    public targetUrl: string = '',
    public descriptions: string = '',
    public timestamp: any = {}
  ) {}
}

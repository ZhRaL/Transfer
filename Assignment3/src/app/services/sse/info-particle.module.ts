export class InfoParticleModule {

  public active: boolean;
  public show: boolean;

  constructor(public id: string, public name: string) {
    this.id = id
    this.name = name
    this.active = true
    this.show = true
  }
}

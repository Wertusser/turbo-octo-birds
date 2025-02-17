import { AbstractProvider, Network, PerformActionRequest } from "ethers";

export class RoundRobinProvider extends AbstractProvider {
  private index: number = 0;

  constructor(private providers: AbstractProvider[]) {
    super();
  }

  private getNextProvider(): AbstractProvider {
    const provider = this.providers[this.index]!;
    this.index = (this.index + 1) % this.providers.length;
    return provider;
  }

  async _detectNetwork(): Promise<Network> {
    const networks = await Promise.all(
      this.providers.map((c) => c.getNetwork())
    );
    const network = networks[0];
    const validNetworks =
      !!network && networks.every((n) => n.chainId === network.chainId);

    if (!validNetworks) throw new Error("Chain id mismatch");

    return network as Network;
  }

  async _perform(req: PerformActionRequest): Promise<any> {
    const provider = this.getNextProvider();
    return provider._perform(req);
  }
}

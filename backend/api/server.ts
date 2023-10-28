import {PersonDataProp, CreatePersonDataProp, UpdatePersonDataProp,
  ResearchDataProp, CreateResearchDataProp, UpdateResearchDataProp,
  PublicationDataProp, CreatePublicationDataProp, UpdatePublicationDataProp} from './generated/schemas';
import {IServerAPI} from './generated/IHandler';

export type IState = {
  id: string;
}

export default {
  getPeoplesData: async _req => {
    try {
      const g = {

      } as PersonDataProp;
      return [204, g];
    } catch {
      return [404];
    }
  },
  createPeopleData: async _req => {
    return [401];
  },
  updatePeopleData: async _req => {
    return [401];
  },
  deletePeopleData: async _req => {
    return [401];
  },
  getResearchsData: async _req => {
    return [404];
  },
  createResearchData: async _req => {
    return [201];
  },
  updateResearchData: async _req => {
    return [401];
  },
  deleteResearchData: async _req => {
    return [401];
  },
  getPublicationsData: async _req => {
    return [404];
  },
  createPublicationData: async _req => {
    return [401];
  },
  updatePublicationData: async _req => {
    return [401];
  },
  deletePublicationData: async _req => {
    return [401];
  }
} as IServerAPI<IState>;

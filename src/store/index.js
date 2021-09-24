import { createStore } from 'vuex';

export default createStore({
  state: {
    invoiceDatabase: [
      {
        invoiceId: 4345,
        invoiceStatus: 'Pending',
        invoiceDate: '2021-04-12',
        clientName: 'Norbert',
        clientEmail: 'norbert@abc.com',
        clientStreetAddress: 'Wall Street 5/3',
        clientCity: 'Paris',
        clientZipCode: 65152,
        clientCountry: 'France',
        clientNote: 'Please use strong package.',
        paymentTerms: '30 days Payment',
        paymentDate: '2021-05-12',
        productsList: [
          {
            itemId: 101,
            itemName: 'Black Paint',
            itemQuantity: 5,
            unitPrice: 4.99,
            itemTotal: 24.95,
          },
          {
            itemId: 102,
            itemName: 'Blue Paint',
            itemQuantity: 3,
            unitPrice: 4.99,
            itemTotal: 14.97,
          },
        ],
        invoiceTotal: 39.92,
      },
      {
        invoiceId: 4346,
        invoiceStatus: 'Paid',
        invoiceDate: '2021-03-12',
        clientName: 'Justyna',
        clientEmail: 'justyna@abc.com',
        clientStreetAddress: 'Wood Street 1/2',
        clientCity: 'Madrid',
        clientZipCode: 12178,
        clientCountry: 'Spain',
        clientNote: 'Please use eco package.',
        paymentTerms: '60 days Payment',
        paymentDate: '2021-05-11',
        productsList: [
          {
            itemId: 101,
            itemName: 'Black',
            itemQuantity: 1,
            unitPrice: 4.99,
            itemTotal: 4.99,
          },
          {
            itemId: 102,
            itemName: 'Blue',
            itemQuantity: 1,
            unitPrice: 4.99,
            itemTotal: 4.99,
          },
        ],
        invoiceTotal: 9.98,
      },
    ],
    filters: {
      country: 'Country',
      status: 'Status',
    },
    selectOptionsCountry: [
      {
        value: 'France',
      },
      {
        value: 'Spain',
      },
    ],
    selectOptionsPayment: [
      {
        value: '30 days Payment',
      },
      {
        value: '60 days Payment',
      },
    ],
    selectOptionsProduct: [
      {
        value: 'Black Paint',
      },
      {
        value: 'Blue Paint',
      },
    ],
    nextId: 80001,
  },
  getters: {
    getInvoiceDatabaseAll(state) {
      return state.invoiceDatabase;
    },
    getInvoiceDatabaseFiltered(state, getters) {
      const allInvoices = getters.getInvoiceDatabaseAll;
      const { filters } = state;
      if (filters.country === 'Country' && filters.status === 'Status') {
        return allInvoices.filter((inv) => inv);
      }
      if (filters.country === 'Country' && filters.status !== 'Status') {
        return allInvoices.filter((inv) => inv.invoiceStatus === filters.status);
      }
      if (filters.country !== 'Country' && filters.status === 'Status') {
        return allInvoices.filter((inv) => inv.clientCountry === filters.country);
      }
      return allInvoices.filter((inv) => inv.invoiceStatus === filters.status && inv.clientCountry === filters.country);
    },
    getAttributeSelectOptions(state) {
      return [state.selectOptionsCountry, state.selectOptionsPayment, state.selectOptionsProduct];
    },
    getNextId(state) {
      state.nextId += 1;
      return state.nextId;
    },
  },
  mutations: {
    updateInvoice(state, payload) {
      const index = state.invoiceDatabase.findIndex((inv) => inv.invoiceId === payload.invoiceId);
      if (index !== -1) {
        state.invoiceDatabase[index] = payload;
      }
    },
    createInvoice(state, payload) {
      state.invoiceDatabase.push(payload);
    },
    deleteInvoice(state, payload) {
      const index = state.invoiceDatabase.findIndex((inv) => inv.invoiceId === payload);
      if (index !== -1) {
        state.invoiceDatabase.splice(index, 1);
      }
    },
    setFilters(state, payload) {
      state.filters.country = payload.country;
      state.filters.status = payload.status;
    },
  },
  actions: {
    updateInvoice(context, payload) {
      context.commit('updateInvoice', payload);
    },
    createInvoice(context, payload) {
      context.commit('createInvoice', payload);
    },
    deleteInvoice(context, payload) {
      context.commit('deleteInvoice', payload);
    },
    setFilters(context, payload) {
      context.commit('setFilters', payload);
    },
  },
});

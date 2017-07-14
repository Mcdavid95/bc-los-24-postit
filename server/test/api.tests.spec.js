import should from ('chai').should();
import expect from ('chai').expect;
import supertest from 'supertest';
import server from '../../server'
const api = supertest(server);
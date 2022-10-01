const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Manager", function () {
  let Manager, manager;

  before(async function() {
    Manager = await ethers.getContractFactory("Manager");
    manager = await Manager.deploy();
    await manager.deployed();
  })

  it("Should create a ticket", async function () {
    await manager.createTicket("test");
    let tickets = await manager.getTickets();
    expect(tickets[0].name).to.equal("test");
  });

  it("Should update a ticket's name", async function () {
    await manager.updateTicketName(0, "Nirban");
    let tickets = await manager.getTickets();
    expect(tickets[0].name).to.equal("Nirban");
  });

  it("Should update a ticket's status", async function () {
    await manager.updateStatus(0, 2);
    let tickets = await manager.getTickets();
    expect(tickets[0].status).to.equal(2);
  });

  it("Should return all the tickets", async function () {
    await manager.createTicket("test");
    await manager.createTicket("Nirban");
    await manager.createTicket("Chakraborty");
    await manager.createTicket("test-1");
    await manager.getTickets();
    let tickets = await manager.getTickets();
    expect(tickets.length).to.equal(5);
  });
});

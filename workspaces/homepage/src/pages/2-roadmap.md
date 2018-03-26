---
path: /roadmap
title: Roadmap
---

Timeline
--------

| 2018             | Mar | Apr | May | Jun | Jul | Aug |
|------------------|:---:|:---:|:---:|:---:|:---:|:---:|
| [RDEX][1]        |  x  |  x  |     |     |     |     |
| [Cogito][2]      |  x  |  x  |  x  |  x  |  x  |  x  |
| [MPC][3]         |     |     |  x  |     |     |  x  |


Backlog
-------

Priority from high to low:

| [RDEX][1]                | [Cogito][2]                   | [MPC][3]         |
|--------------------------|-------------------------------|------------------|
|                          | Monorepo                      |                  |
|                          | Docs                          |                  |
|                          | Justification for open source |                  |
|                          | Start process for open source |                  |
| Use Truffle box setup    |                               |                  |
| Integration with Cogito  |                               |                  |
| Deployment for Catharina |                               |                  |
|                          | Replace Geth                  |                  |
|                          | Deployment Catharina          |                  |
|                          |                               | Garbled circuits |

Activities
----------

### RDEX (Research Data Exchange)

Current goal is to deploy RDEX for Catharina and TU/e, so that user testing can
commence.

This requires the following work to happen:
- Refactoring of build system (based on new Truffle box)
- RDEX integration with Cogito
- Deployment of RDEX and Cogito
- Support

### Cogito

Our goal with Cogito is to deliver a component for identity management that
works well with blockchain based apps. In order to get enough early feedback we
intend to release Cogito under and open source license.

This requires the following work to happen:
- Ensure that our documentation leads to a good developer experience
- Security Audit & Privacy Audit
- Open Sourcing
    - Write justification document describing why we want to open source
        - Needs to clarify our position w.r.t. the IP&S work for NotarisID
    - Go through internal process for open sourcing
    - Replace Geth with alternative with better license
    - Build external presence, community
    - Come up with (and build) compelling flagship use case
- Deploy to Testflight, and eventually to the App Store
- Telepath queuing service robustness
    - Remove old messages from memory
- Create Android / Cross platform app

### Secure Multi-party Computation
Ongoing activity: 0.5 FTE

- Benchmarking using garbled circuits
- Rest to be determined

### Research

- Investigate latest Ethereum releases
- Blockchain governance (Microsoft Coco + Others)
- Getting ahead of the game: use case generation around the
  properties of blockchain (immutability, decentralization, high availability)
    - Sharing of credential claims
    - See also: [DIDs for Cogito self-sovereign identity solution][4]
- Investigate different ways of key management, e.g. Keybase,
  SQRL, NotarisID
- Auth pilot with Cogito for MedMij?
- Application of Zero Knowledge in a healthcare use case
- IOT(A)
- Decentralized storage for personal health records
- Vision for DAOs in healthcare

### Finance Inner Supply Chain

- Advice and consulting
    - SAP Technology Evaluation
    - Is Ripple the backup plan?

### HealthSuite Insights

- Investigate Hyperledger
- Move over to Hyperledger
- Support

### MyHealthJourney / CDP²

- Externally verifiable logs of Personal Health Record access
- Verifiable versioning of Personal Health Records
- Exporting/sharing of Personal Health Records

### Novartis

- To be determined

[1]: #rdex-research-data-exchange
[2]: #cogito
[3]: #secure-multi-party-computation
[4]: https://confluence.atlas.philips.com/display/BLA/DIDs+for+Cogito+self-sovereign+identity+solution

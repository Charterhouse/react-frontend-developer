---
path: /
title: Blockchain lab
---

This special lab at Philips Research focuses on technology that creates trust
where it could otherwise not be found. Blockchain is one of the technologies
that we study and apply in our prototypes.

[Visit us on Socialcast][1]

Identity
--------

One interesting concept to come out of the blockchain scene is that of self-sovereign identities. Instead of using a username that has been given to
you by a provider like Facebook or Google, you create your own identity and
rely on cryptography for security and privacy. Perhaps surprisingly this can be
used to tackle a number of usability problems around usernames/passwords and
cryptographic key management.

We created a prototype that demonstrates how you can create your own identity
using a mobile app, and use it in real-world scenarios:

- [Cogito][8]

Marketplaces
------------

A blockchain can be used to create a marketplace where trust issues would
previously not allow this to happen. For instance, with our colleagues in supply
chain and finance we created a prototype marketplace for last-mile delivery of
our consumer products.

We also created a prototype marketplace for HealthSuite Insights.

- [Supply chain demo][6]
- [HealthSuite Insights marketplace][7]

Audit trails
------------

Audit trails are used to verify compliance in healthcare processes. At its
most basic level they are a listing of significant events that occurred
while following a process. When you tie this audit trail to a blockchain you
get the added benefit that it no longer can be changed after the fact, making
it much easier for others (such as an auditor) to trust it.

We created a number of prototypes where we took an existing process and added an immutable audit trail to increase trust:

- [Research Data Exchange][2] - a proof of concept for a system that allows care
  givers and researchers to securely exchange information about patients, for
  research purposes.
- [Purchase Orders][3] - a prototype for the Philips Treasury department
  that models purchase orders on a blockchain to increase trust and the speed
  at which they are processed.

Cloud computing privacy
-----------------------

Together with our cryptographer colleagues we are creating prototypes that allow
cloud computing to happen between a number of parties, for instance hospitals,
without the need for these hospitals to share this data with each other. The
underlying technology is Secure multi-party computation.

- [Logistic Regression prototype][4] - a simple machine learning algorithm where
  the data sets are not disclosed between parties.
- [Multi-party Garbled circuits][5] - allow benchmarking between hospitals
  without the need for disclosing performance data.

[1]: https://philips.socialcast.com/groups/6078-blockchainlab
[2]: https://gitlab.ta.philips.com/blockchain-lab/RDEX
[3]: https://gitlab.ta.philips.com/blockchain-lab/finance-demo
[4]: https://github.com/Charterhouse/Fresco-Logistic-Regression
[5]: https://gitlab.ta.philips.com/blockchain-lab/multiparty-garbled-circuits
[6]: https://github.com/phi-nomenal/phi-nomenal
[7]: https://gitlab.ta.philips.com/blockchain-lab/dsp-demo
[8]: /cogito

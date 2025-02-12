/**
 * Program IDL in camelCase format in order to be used in JS/TS.
 *
 * Note that this is only a type helper and is not the actual IDL. The original
 * IDL can be found at `target/idl/PaperFi.json`.
 */
export type PaperFi = {
  "address": "coUnmi3oBUtwtd9fjeAvSsJssXh5A5xyPbhpewyzRVF",
  "metadata": {
    "name": "paperFi",
    "version": "0.1.0",
    "spec": "0.1.0",
    "description": "Created with Anchor"
  },
  "instructions": [
    {
      "name": "adminWithdraw",
      "discriminator": [
        160,
        166,
        147,
        222,
        46,
        220,
        75,
        224
      ],
      "accounts": [
        {
          "name": "admin",
          "writable": true,
          "signer": true
        },
        {
          "name": "configVault",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  99,
                  111,
                  110,
                  102,
                  105,
                  103,
                  95,
                  118,
                  97,
                  117,
                  108,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "config"
              }
            ]
          }
        },
        {
          "name": "config",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  112,
                  97,
                  112,
                  101,
                  114,
                  102,
                  105,
                  95,
                  99,
                  111,
                  110,
                  102,
                  105,
                  103
                ]
              }
            ]
          }
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": []
    },
    {
      "name": "buyPaper",
      "discriminator": [
        5,
        194,
        65,
        179,
        131,
        106,
        145,
        217
      ],
      "accounts": [
        {
          "name": "buyer",
          "writable": true,
          "signer": true
        },
        {
          "name": "buyerUserAccount",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  117,
                  115,
                  101,
                  114
                ]
              },
              {
                "kind": "account",
                "path": "buyer"
              }
            ]
          }
        },
        {
          "name": "userAccount",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  117,
                  115,
                  101,
                  114
                ]
              },
              {
                "kind": "account",
                "path": "paper.owner",
                "account": "paper"
              }
            ]
          }
        },
        {
          "name": "userVault",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  117,
                  115,
                  101,
                  114,
                  95,
                  118,
                  97,
                  117,
                  108,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "paper.owner",
                "account": "paper"
              }
            ]
          }
        },
        {
          "name": "config",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  112,
                  97,
                  112,
                  101,
                  114,
                  102,
                  105,
                  95,
                  99,
                  111,
                  110,
                  102,
                  105,
                  103
                ]
              }
            ]
          }
        },
        {
          "name": "configVault",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  99,
                  111,
                  110,
                  102,
                  105,
                  103,
                  95,
                  118,
                  97,
                  117,
                  108,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "config"
              }
            ]
          }
        },
        {
          "name": "paper",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  112,
                  97,
                  112,
                  101,
                  114
                ]
              },
              {
                "kind": "account",
                "path": "paper.owner",
                "account": "paper"
              },
              {
                "kind": "arg",
                "path": "id"
              }
            ]
          }
        },
        {
          "name": "paperOwned",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  112,
                  117,
                  114,
                  99,
                  104,
                  97,
                  115,
                  101
                ]
              },
              {
                "kind": "account",
                "path": "buyer"
              },
              {
                "kind": "account",
                "path": "paper"
              }
            ]
          }
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "id",
          "type": "u64"
        }
      ]
    },
    {
      "name": "editPaper",
      "discriminator": [
        239,
        7,
        31,
        141,
        211,
        193,
        82,
        211
      ],
      "accounts": [
        {
          "name": "owner",
          "writable": true,
          "signer": true
        },
        {
          "name": "paper",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  112,
                  97,
                  112,
                  101,
                  114
                ]
              },
              {
                "kind": "account",
                "path": "owner"
              },
              {
                "kind": "arg",
                "path": "id"
              }
            ]
          }
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "id",
          "type": "u64"
        },
        {
          "name": "params",
          "type": {
            "defined": {
              "name": "editPaperParams"
            }
          }
        }
      ]
    },
    {
      "name": "editReview",
      "discriminator": [
        9,
        148,
        111,
        178,
        12,
        245,
        91,
        166
      ],
      "accounts": [
        {
          "name": "signer",
          "writable": true,
          "signer": true
        },
        {
          "name": "paper",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  112,
                  97,
                  112,
                  101,
                  114
                ]
              },
              {
                "kind": "account",
                "path": "paper.owner",
                "account": "paper"
              },
              {
                "kind": "arg",
                "path": "id"
              }
            ]
          }
        },
        {
          "name": "review",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  114,
                  101,
                  118,
                  105,
                  101,
                  119
                ]
              },
              {
                "kind": "account",
                "path": "signer"
              },
              {
                "kind": "account",
                "path": "paper"
              }
            ]
          }
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "id",
          "type": "u64"
        },
        {
          "name": "verdict",
          "type": {
            "defined": {
              "name": "verdict"
            }
          }
        }
      ]
    },
    {
      "name": "editUser",
      "discriminator": [
        154,
        159,
        198,
        79,
        53,
        229,
        58,
        80
      ],
      "accounts": [
        {
          "name": "owner",
          "writable": true,
          "signer": true
        },
        {
          "name": "user",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  117,
                  115,
                  101,
                  114
                ]
              },
              {
                "kind": "account",
                "path": "owner"
              }
            ]
          }
        }
      ],
      "args": [
        {
          "name": "params",
          "type": {
            "defined": {
              "name": "editUserParams"
            }
          }
        }
      ]
    },
    {
      "name": "initialize",
      "discriminator": [
        175,
        175,
        109,
        31,
        13,
        152,
        155,
        237
      ],
      "accounts": [
        {
          "name": "admin",
          "writable": true,
          "signer": true
        },
        {
          "name": "configVault",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  99,
                  111,
                  110,
                  102,
                  105,
                  103,
                  95,
                  118,
                  97,
                  117,
                  108,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "config"
              }
            ]
          }
        },
        {
          "name": "config",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  112,
                  97,
                  112,
                  101,
                  114,
                  102,
                  105,
                  95,
                  99,
                  111,
                  110,
                  102,
                  105,
                  103
                ]
              }
            ]
          }
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": []
    },
    {
      "name": "makeBadge",
      "discriminator": [
        199,
        165,
        206,
        200,
        138,
        104,
        92,
        91
      ],
      "accounts": [
        {
          "name": "admin",
          "writable": true,
          "signer": true
        },
        {
          "name": "config",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  112,
                  97,
                  112,
                  101,
                  114,
                  102,
                  105,
                  95,
                  99,
                  111,
                  110,
                  102,
                  105,
                  103
                ]
              }
            ]
          }
        },
        {
          "name": "badge",
          "writable": true,
          "signer": true
        },
        {
          "name": "mplCoreProgram",
          "address": "CoREENxT6tW1HoK8ypY1SxRMZTcVPm7R94rH4PZNhX7d"
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "args",
          "type": {
            "defined": {
              "name": "createBadgeArgs"
            }
          }
        }
      ]
    },
    {
      "name": "mintAchievementNft",
      "discriminator": [
        215,
        35,
        8,
        179,
        20,
        237,
        118,
        82
      ],
      "accounts": [
        {
          "name": "user",
          "writable": true,
          "signer": true
        },
        {
          "name": "userAccount",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  117,
                  115,
                  101,
                  114
                ]
              },
              {
                "kind": "account",
                "path": "user"
              }
            ]
          }
        },
        {
          "name": "config",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  112,
                  97,
                  112,
                  101,
                  114,
                  102,
                  105,
                  95,
                  99,
                  111,
                  110,
                  102,
                  105,
                  103
                ]
              }
            ]
          }
        },
        {
          "name": "badge",
          "writable": true
        },
        {
          "name": "print",
          "writable": true,
          "signer": true
        },
        {
          "name": "mplCoreProgram",
          "address": "CoREENxT6tW1HoK8ypY1SxRMZTcVPm7R94rH4PZNhX7d"
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "args",
          "type": {
            "defined": {
              "name": "printBadgeArgs"
            }
          }
        }
      ]
    },
    {
      "name": "newAuthor",
      "discriminator": [
        221,
        138,
        151,
        50,
        131,
        22,
        165,
        67
      ],
      "accounts": [
        {
          "name": "owner",
          "writable": true,
          "signer": true
        },
        {
          "name": "paper",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  112,
                  97,
                  112,
                  101,
                  114
                ]
              },
              {
                "kind": "account",
                "path": "owner"
              },
              {
                "kind": "arg",
                "path": "id"
              }
            ]
          }
        },
        {
          "name": "paperAuthor",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  97,
                  117,
                  116,
                  104,
                  111,
                  114
                ]
              },
              {
                "kind": "arg",
                "path": "author"
              },
              {
                "kind": "account",
                "path": "paper"
              }
            ]
          }
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "author",
          "type": "pubkey"
        },
        {
          "name": "id",
          "type": "u64"
        }
      ]
    },
    {
      "name": "newPaper",
      "discriminator": [
        151,
        168,
        42,
        87,
        8,
        72,
        9,
        191
      ],
      "accounts": [
        {
          "name": "owner",
          "writable": true,
          "signer": true
        },
        {
          "name": "userAccount",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  117,
                  115,
                  101,
                  114
                ]
              },
              {
                "kind": "account",
                "path": "owner"
              }
            ]
          }
        },
        {
          "name": "paper",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  112,
                  97,
                  112,
                  101,
                  114
                ]
              },
              {
                "kind": "account",
                "path": "owner"
              },
              {
                "kind": "arg",
                "path": "id"
              }
            ]
          }
        },
        {
          "name": "paperAuthor",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  97,
                  117,
                  116,
                  104,
                  111,
                  114
                ]
              },
              {
                "kind": "account",
                "path": "owner"
              },
              {
                "kind": "account",
                "path": "paper"
              }
            ]
          }
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "id",
          "type": "u64"
        },
        {
          "name": "paperInfoUrl",
          "type": "string"
        },
        {
          "name": "price",
          "type": "u64"
        },
        {
          "name": "uri",
          "type": "string"
        }
      ]
    },
    {
      "name": "reviewPaper",
      "discriminator": [
        143,
        66,
        152,
        52,
        94,
        165,
        129,
        123
      ],
      "accounts": [
        {
          "name": "signer",
          "writable": true,
          "signer": true
        },
        {
          "name": "reviewerUserAccount",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  117,
                  115,
                  101,
                  114
                ]
              },
              {
                "kind": "account",
                "path": "signer"
              }
            ]
          }
        },
        {
          "name": "userAccount",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  117,
                  115,
                  101,
                  114
                ]
              },
              {
                "kind": "account",
                "path": "paper.owner",
                "account": "paper"
              }
            ]
          }
        },
        {
          "name": "paper",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  112,
                  97,
                  112,
                  101,
                  114
                ]
              },
              {
                "kind": "account",
                "path": "paper.owner",
                "account": "paper"
              },
              {
                "kind": "arg",
                "path": "id"
              }
            ]
          }
        },
        {
          "name": "review",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  114,
                  101,
                  118,
                  105,
                  101,
                  119
                ]
              },
              {
                "kind": "account",
                "path": "signer"
              },
              {
                "kind": "account",
                "path": "paper"
              }
            ]
          }
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "id",
          "type": "u64"
        },
        {
          "name": "verdict",
          "type": {
            "defined": {
              "name": "verdict"
            }
          }
        },
        {
          "name": "uri",
          "type": "string"
        }
      ]
    },
    {
      "name": "signup",
      "discriminator": [
        131,
        45,
        148,
        237,
        166,
        142,
        235,
        53
      ],
      "accounts": [
        {
          "name": "signer",
          "writable": true,
          "signer": true
        },
        {
          "name": "user",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  117,
                  115,
                  101,
                  114
                ]
              },
              {
                "kind": "account",
                "path": "signer"
              }
            ]
          }
        },
        {
          "name": "userVault",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  117,
                  115,
                  101,
                  114,
                  95,
                  118,
                  97,
                  117,
                  108,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "signer"
              }
            ]
          }
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "name",
          "type": "string"
        },
        {
          "name": "title",
          "type": "string"
        }
      ]
    },
    {
      "name": "userWithdraw",
      "discriminator": [
        53,
        254,
        26,
        242,
        119,
        237,
        73,
        33
      ],
      "accounts": [
        {
          "name": "user",
          "writable": true,
          "signer": true
        },
        {
          "name": "userVault",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  117,
                  115,
                  101,
                  114,
                  95,
                  118,
                  97,
                  117,
                  108,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "user"
              }
            ]
          }
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "vaultBump",
          "type": "u8"
        }
      ]
    },
    {
      "name": "verify",
      "discriminator": [
        133,
        161,
        141,
        48,
        120,
        198,
        88,
        150
      ],
      "accounts": [
        {
          "name": "author",
          "writable": true,
          "signer": true
        },
        {
          "name": "paper",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  112,
                  97,
                  112,
                  101,
                  114
                ]
              },
              {
                "kind": "account",
                "path": "paper.owner",
                "account": "paper"
              },
              {
                "kind": "arg",
                "path": "id"
              }
            ]
          }
        },
        {
          "name": "paperAuthor",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  97,
                  117,
                  116,
                  104,
                  111,
                  114
                ]
              },
              {
                "kind": "account",
                "path": "author"
              },
              {
                "kind": "account",
                "path": "paper"
              }
            ]
          }
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "id",
          "type": "u64"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "baseCollectionV1",
      "discriminator": [
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0
      ]
    },
    {
      "name": "paper",
      "discriminator": [
        23,
        208,
        255,
        36,
        198,
        93,
        63,
        12
      ]
    },
    {
      "name": "paperAuthor",
      "discriminator": [
        23,
        71,
        130,
        209,
        199,
        45,
        150,
        208
      ]
    },
    {
      "name": "paperFiConfig",
      "discriminator": [
        42,
        190,
        54,
        218,
        138,
        160,
        101,
        112
      ]
    },
    {
      "name": "paperOwned",
      "discriminator": [
        157,
        209,
        35,
        17,
        36,
        57,
        222,
        244
      ]
    },
    {
      "name": "review",
      "discriminator": [
        124,
        63,
        203,
        215,
        226,
        30,
        222,
        15
      ]
    },
    {
      "name": "userAccount",
      "discriminator": [
        211,
        33,
        136,
        16,
        186,
        110,
        242,
        127
      ]
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "invalidFieldLength",
      "msg": "Exceeded the field length allowed"
    },
    {
      "code": 6001,
      "name": "fieldIsEmpty",
      "msg": "Must provide a name and a title"
    },
    {
      "code": 6002,
      "name": "emojisNotAllowed",
      "msg": "The input string contains emojis, which are not allowed"
    },
    {
      "code": 6003,
      "name": "mathOverflow",
      "msg": "Something went wrong. Mathoverflow!"
    },
    {
      "code": 6004,
      "name": "insufficientFunds",
      "msg": "Vault is empty."
    },
    {
      "code": 6005,
      "name": "unauthorized",
      "msg": "Unauthorized access."
    },
    {
      "code": 6006,
      "name": "invalidAchievement",
      "msg": "You have not reached the required achievement level for this badge."
    },
    {
      "code": 6007,
      "name": "unknownBadge",
      "msg": "Unknown badge type."
    },
    {
      "code": 6008,
      "name": "tooManyAdmins",
      "msg": "Max Admins allowed have been reached"
    },
    {
      "code": 6009,
      "name": "incorrectPricing",
      "msg": "Prince can't be negative"
    }
  ],
  "types": [
    {
      "name": "baseCollectionV1",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "key",
            "type": {
              "defined": {
                "name": "key"
              }
            }
          },
          {
            "name": "updateAuthority",
            "type": "pubkey"
          },
          {
            "name": "name",
            "type": "string"
          },
          {
            "name": "uri",
            "type": "string"
          },
          {
            "name": "numMinted",
            "type": "u32"
          },
          {
            "name": "currentSize",
            "type": "u32"
          }
        ]
      }
    },
    {
      "name": "createBadgeArgs",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "name",
            "type": "string"
          },
          {
            "name": "uri",
            "type": "string"
          }
        ]
      }
    },
    {
      "name": "editPaperParams",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "paperInfoUrl",
            "type": {
              "option": "string"
            }
          },
          {
            "name": "listed",
            "type": {
              "option": "bool"
            }
          },
          {
            "name": "price",
            "type": {
              "option": "u64"
            }
          },
          {
            "name": "reviews",
            "type": {
              "option": "u32"
            }
          },
          {
            "name": "sales",
            "type": {
              "option": "u32"
            }
          },
          {
            "name": "version",
            "type": {
              "option": "u32"
            }
          },
          {
            "name": "paperUri",
            "type": {
              "option": "string"
            }
          }
        ]
      }
    },
    {
      "name": "editUserParams",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "name",
            "type": {
              "option": "string"
            }
          },
          {
            "name": "title",
            "type": {
              "option": "string"
            }
          },
          {
            "name": "purchases",
            "type": {
              "option": "u32"
            }
          },
          {
            "name": "papers",
            "type": {
              "option": "u32"
            }
          },
          {
            "name": "reviews",
            "type": {
              "option": "u32"
            }
          }
        ]
      }
    },
    {
      "name": "key",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "uninitialized"
          },
          {
            "name": "assetV1"
          },
          {
            "name": "hashedAssetV1"
          },
          {
            "name": "pluginHeaderV1"
          },
          {
            "name": "pluginRegistryV1"
          },
          {
            "name": "collectionV1"
          }
        ]
      }
    },
    {
      "name": "paper",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "paperInfoUrl",
            "type": "string"
          },
          {
            "name": "version",
            "type": "u32"
          },
          {
            "name": "owner",
            "type": "pubkey"
          },
          {
            "name": "listed",
            "type": "bool"
          },
          {
            "name": "price",
            "type": "u64"
          },
          {
            "name": "bump",
            "type": "u8"
          },
          {
            "name": "userBump",
            "type": "u8"
          },
          {
            "name": "reviews",
            "type": "u32"
          },
          {
            "name": "reviewStatus",
            "type": {
              "defined": {
                "name": "reviewStatus"
              }
            }
          },
          {
            "name": "sales",
            "type": "u32"
          },
          {
            "name": "timestamp",
            "type": "u64"
          },
          {
            "name": "paperUri",
            "type": "string"
          }
        ]
      }
    },
    {
      "name": "paperAuthor",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "author",
            "type": "pubkey"
          },
          {
            "name": "paper",
            "type": "pubkey"
          },
          {
            "name": "verify",
            "type": "bool"
          },
          {
            "name": "bump",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "paperFiConfig",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "admins",
            "type": {
              "vec": "pubkey"
            }
          },
          {
            "name": "fee",
            "type": {
              "option": "u8"
            }
          },
          {
            "name": "bump",
            "type": "u8"
          },
          {
            "name": "vaultBump",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "paperOwned",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "buyer",
            "type": "pubkey"
          },
          {
            "name": "paper",
            "type": "pubkey"
          },
          {
            "name": "timestamp",
            "type": "u64"
          },
          {
            "name": "bump",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "printBadgeArgs",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "name",
            "type": "string"
          },
          {
            "name": "uri",
            "type": "string"
          },
          {
            "name": "achievement",
            "type": "string"
          },
          {
            "name": "record",
            "type": "u32"
          },
          {
            "name": "timestamp",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "review",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "owner",
            "type": "pubkey"
          },
          {
            "name": "paper",
            "type": "pubkey"
          },
          {
            "name": "verdict",
            "type": {
              "defined": {
                "name": "verdict"
              }
            }
          },
          {
            "name": "timestamp",
            "type": "u64"
          },
          {
            "name": "reviewUri",
            "type": "string"
          }
        ]
      }
    },
    {
      "name": "reviewStatus",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "approved",
            "type": "i64"
          },
          {
            "name": "rejected",
            "type": "i64"
          },
          {
            "name": "reviewRequested",
            "type": "i64"
          }
        ]
      }
    },
    {
      "name": "userAccount",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "name",
            "type": "string"
          },
          {
            "name": "title",
            "type": "string"
          },
          {
            "name": "purchases",
            "type": "u32"
          },
          {
            "name": "papers",
            "type": "u32"
          },
          {
            "name": "reviews",
            "type": "u32"
          },
          {
            "name": "owner",
            "type": "pubkey"
          },
          {
            "name": "bump",
            "type": "u8"
          },
          {
            "name": "vaultBump",
            "type": "u8"
          },
          {
            "name": "timestamp",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "verdict",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "approved"
          },
          {
            "name": "rejected"
          },
          {
            "name": "reviewRequested"
          }
        ]
      }
    }
  ]
};

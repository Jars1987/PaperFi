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
          "name": "user",
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
                "path": "user"
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
          "name": "maker",
          "writable": true,
          "signer": true
        },
        {
          "name": "admin",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  97,
                  100,
                  109,
                  105,
                  110
                ]
              },
              {
                "kind": "account",
                "path": "maker"
              }
            ]
          }
        },
        {
          "name": "adminVault",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  97,
                  100,
                  109,
                  105,
                  110,
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
                "path": "maker"
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
          "name": "user",
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
                "path": "user"
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
          "name": "authors",
          "type": "string"
        },
        {
          "name": "title",
          "type": "string"
        },
        {
          "name": "intro",
          "type": "string"
        },
        {
          "name": "price",
          "type": "u16"
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
                "path": "user"
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
    }
  ],
  "accounts": [
    {
      "name": "admin",
      "discriminator": [
        244,
        158,
        220,
        65,
        8,
        73,
        4,
        65
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
      "name": "user",
      "discriminator": [
        159,
        117,
        95,
        227,
        239,
        151,
        58,
        236
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
    }
  ],
  "types": [
    {
      "name": "admin",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "owner",
            "type": "pubkey"
          },
          {
            "name": "vault",
            "type": "pubkey"
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
      "name": "editPaperParams",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "authors",
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
            "name": "intro",
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
              "option": "u16"
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
              "option": "u16"
            }
          },
          {
            "name": "papers",
            "type": {
              "option": "u16"
            }
          },
          {
            "name": "reviews",
            "type": {
              "option": "u16"
            }
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
            "name": "authors",
            "type": "string"
          },
          {
            "name": "title",
            "type": "string"
          },
          {
            "name": "intro",
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
            "type": "u16"
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
            "type": "u32"
          },
          {
            "name": "rejected",
            "type": "u32"
          },
          {
            "name": "reviewRequested",
            "type": "u32"
          }
        ]
      }
    },
    {
      "name": "user",
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
            "type": "u16"
          },
          {
            "name": "papers",
            "type": "u16"
          },
          {
            "name": "reviews",
            "type": "u16"
          },
          {
            "name": "owner",
            "type": "pubkey"
          },
          {
            "name": "vault",
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

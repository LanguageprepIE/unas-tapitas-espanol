// Original teaching content for Unas Tapitas de Español. School scope: Unit 1, four weeks.
export const tenerRows=[['yo','tengo'],['tú','tienes'],['él / ella','tiene'],['nosotros / nosotras','tenemos'],['vosotros / vosotras','tenéis'],['ellos / ellas','tienen']];
export const estarRows=[['yo','estoy'],['tú','estás'],['él / ella','está'],['nosotros / nosotras','estamos'],['vosotros / vosotras','estáis'],['ellos / ellas','están']];
export const topics=[['greetings','Greetings and goodbyes','Saludos y despedidas'],['names','Names and surnames','Nombres y apellidos'],['alphabet','Letters and sounds','Letras y sonidos'],['numbers','Numbers 0–20','Números 0–20'],['pronouns','Who is speaking?','Quién habla'],['age','Tener and age','Tener y la edad'],['feelings','Estar and feelings','Estar y los estados'],['punctuation','Writing clearly','Escribir con claridad'],['help','Keeping a conversation going','Mantener una conversación'],['culture','Names and the Spanish-speaking world','Nombres y mundo hispanohablante']];
const table=(headers,rows)=>({headers,rows});
export const expandedLessons=[
  {
    "id": "greetings",
    "title": [
      "1 · Greetings and goodbyes",
      "1 · Saludos y despedidas"
    ],
    "intro": [
      "**Buenos días** is used in the morning, **buenas tardes** in the afternoon and **buenas noches** at night. **Hola** works at any time.",
      "**Buenos días** se usa por la mañana, **buenas tardes** por la tarde y **buenas noches** por la noche. **Hola** sirve a cualquier hora."
    ],
    "paragraphs": [
      [
        "For goodbyes, try **adiós**, **hasta luego** or **nos vemos**. Use **hasta mañana** when you expect to meet tomorrow. **Buenas noches** can also mean good night when leaving.",
        "Para despedirte, usa **adiós**, **hasta luego** o **nos vemos**. Usa **hasta mañana** si esperas ver a alguien al día siguiente. **Buenas noches** también sirve para despedirse."
      ]
    ],
    "tables": [
      {
        "headers": [
          [
            "Expression",
            "Expresión"
          ],
          [
            "Use",
            "Uso"
          ]
        ],
        "rows": [
          [
            "Hola",
            [
              "A general greeting.",
              "Saludo general."
            ]
          ],
          [
            "Buenos días",
            [
              "In the morning.",
              "Por la mañana."
            ]
          ],
          [
            "Buenas tardes",
            [
              "In the afternoon / early evening.",
              "Por la tarde."
            ]
          ],
          [
            "Buenas noches",
            [
              "At night: a greeting or goodbye.",
              "Por la noche: saludo o despedida."
            ]
          ],
          [
            "Adiós",
            [
              "A general goodbye.",
              "Despedida general."
            ]
          ],
          [
            "Hasta luego",
            [
              "An everyday “see you later”.",
              "Despedida cotidiana."
            ]
          ],
          [
            "Hasta mañana",
            [
              "When you expect to meet tomorrow.",
              "Cuando esperas ver a alguien mañana."
            ]
          ],
          [
            "Nos vemos",
            [
              "An informal goodbye.",
              "Despedida informal."
            ]
          ],
          [
            "Hasta pronto",
            [
              "You hope to meet again soon.",
              "Esperas volver a ver a alguien pronto."
            ]
          ]
        ]
      }
    ],
    "examples": [
      [
        "Buenos días, Alba. ¿Qué tal?",
        "Good morning, Alba. How is it going?"
      ],
      [
        "Hola, Leo. ¿Cómo estás?",
        "Hi, Leo. How are you?"
      ],
      [
        "Hasta mañana, Inés.",
        "See you tomorrow, Inés."
      ],
      [
        "Buenas noches. Hasta mañana.",
        "Good night. See you tomorrow."
      ]
    ],
    "note": null,
    "checkpoint": {
      "prompt": [
        "You leave class and expect to see Leo tomorrow. Give a fitting goodbye. Could buenas noches open a conversation?",
        "Sales de clase y esperas ver a Leo mañana. Propón una despedida adecuada. ¿Puede buenas noches iniciar una conversación?"
      ],
      "answer": [
        "Hasta mañana, Leo is a suitable goodbye. Yes: buenas noches can greet someone at night as well as say goodbye.",
        "Hasta mañana, Leo es una despedida adecuada. Sí: buenas noches puede servir para saludar por la noche y también para despedirse."
      ]
    },
    "tryIt": [
      "Say hello at three different times of day, then choose three different goodbyes. Explain your choices in English or Spanish.",
      "Saluda en tres momentos distintos del día y elige tres despedidas diferentes. Explica tus elecciones en inglés o español."
    ],
    "extra": null
  },
  {
    "id": "names",
    "title": [
      "2 · Introducing yourself: name and surname",
      "2 · Presentarte: nombre y apellido"
    ],
    "intro": [
      "Ask **¿Cómo te llamas?** and answer **Me llamo…** Add **¿Y tú?** to return the question.",
      "Pregunta **¿Cómo te llamas?** y responde **Me llamo…** Añade **¿Y tú?** para devolver la pregunta."
    ],
    "paragraphs": [
      [
        "**Nombre** means first name; **apellido** means surname. Use **¿Cuál es tu apellido?** for one surname, or **¿Cuáles son tus apellidos?** for more than one.",
        "**Nombre** indica el nombre de pila; **apellido** indica el nombre de familia. Usa **¿Cuál es tu apellido?** para un apellido y **¿Cuáles son tus apellidos?** para varios."
      ],
      [
        "To introduce someone else, use **Se llama…** For several people, use **Se llaman…**",
        "Para presentar a otra persona, usa **Se llama…** Para varias, usa **Se llaman…**"
      ]
    ],
    "examples": [
      [
        "¿Cómo te llamas? — Me llamo Leo. ¿Y tú?",
        "What is your name? — My name is Leo. And you?"
      ],
      [
        "¿Cuál es tu apellido? — Mi apellido es Ruiz.",
        "What is your surname? — My surname is Ruiz."
      ],
      [
        "¿Cuáles son tus apellidos? — Mis apellidos son Martín Vega.",
        "What are your surnames? — My surnames are Martín Vega."
      ],
      [
        "Ella se llama Inés.",
        "Her name is Inés."
      ],
      [
        "Ellas se llaman Inés y Sara.",
        "Their names are Inés and Sara."
      ],
      [
        "Encantada. / Encantado.",
        "Nice to meet you."
      ]
    ],
    "note": [
      "**Encantado / encantada** refers to the person speaking. You can also say **Mucho gusto**.",
      "**Encantado / encantada** se refiere a quien habla. También puedes decir **Mucho gusto**."
    ],
    "checkpoint": {
      "prompt": [
        "In the fictional name Alba Martín Vega, identify the first name and surnames. How would Alba return the name question?",
        "En el nombre ficticio Alba Martín Vega, identifica el nombre y los apellidos. ¿Cómo devolvería Alba la pregunta sobre el nombre?"
      ],
      "answer": [
        "Alba is the first name; Martín Vega are the surnames. Me llamo Alba. ¿Y tú? returns the question.",
        "Alba es el nombre; Martín Vega son los apellidos. Me llamo Alba. ¿Y tú? devuelve la pregunta."
      ]
    },
    "tryIt": [
      "Invent a first name and two surnames. Introduce yourself, introduce a partner, and ask for one surname.",
      "Inventa un nombre y dos apellidos. Preséntate, presenta a un compañero y pregunta por un apellido."
    ],
    "extra": null
  },
  {
    "id": "alphabet",
    "title": [
      "3 · Letters, spelling and useful sounds",
      "3 · Letras, deletreo y sonidos útiles"
    ],
    "intro": [
      "Ask **¿Cómo se escribe tu nombre?** Give a full answer: **Alba se escribe a, ele, be, a**. You can also begin **Mi nombre se escribe…**",
      "Pregunta **¿Cómo se escribe tu nombre?** Da una respuesta completa: **Alba se escribe a, ele, be, a**. También puedes empezar con **Mi nombre se escribe…**"
    ],
    "paragraphs": [
      [
        "The alphabet has **27** letters. **Ñ** is different from **n**; **ch** and **ll** each contain two letters. The five vowels are **a, e, i, o, u**.",
        "El alfabeto tiene **27** letras. **Ñ** es diferente de **n**; **ch** y **ll** tienen dos letras cada una. Las cinco vocales son **a, e, i, o, u**."
      ],
      [
        "**Inés** has four letters: **i, ene, e, ese**. Say **Inés se escribe i, ene, e, ese. Con tilde en la e.** The accent is not an extra letter.",
        "**Inés** tiene cuatro letras: **i, ene, e, ese**. Di **Inés se escribe i, ene, e, ese. Con tilde en la e.** La tilde no es una letra adicional."
      ]
    ],
    "examples": [
      [
        "¿Cómo se escribe tu nombre? — Alba se escribe a, ele, be, a.",
        "How is your name spelt? — Alba is spelt A, L, B, A."
      ],
      [
        "¿Cómo se escribe tu nombre? — Inés se escribe i, ene, e, ese. Con tilde en la e.",
        "How is your name spelt? — Inés is spelt I, N, E, S. With an accent on the e."
      ],
      [
        "¿Con be o con uve?",
        "With b or v?"
      ],
      [
        "España: e, ese, pe, a, eñe, a.",
        "España: E, S, P, A, Ñ, A."
      ]
    ],
    "note": null,
    "checkpoint": {
      "prompt": [
        "How many letters are in Inés? Is ñ the same letter as n? What is the name of h?",
        "¿Cuántas letras tiene Inés? ¿Es ñ la misma letra que n? ¿Cómo se llama la h?"
      ],
      "answer": [
        "Inés has four letters. Ñ and n are different letters. H is called hache.",
        "Inés tiene cuatro letras. Ñ y n son letras diferentes. La h se llama hache."
      ]
    },
    "tryIt": [
      "Ask ¿Cómo se escribe tu nombre? Use a full answer with an invented name: [name] se escribe… Your partner writes the name and checks a letter. Alone, write the question and answer.",
      "Pregunta ¿Cómo se escribe tu nombre? Usa una respuesta completa con un nombre inventado: [nombre] se escribe… Tu compañero escribe el nombre y comprueba una letra. Si estás solo, escribe la pregunta y la respuesta."
    ],
    "extra": [
      [
        "**H** is called **hache** and is normally silent, as in **hola**. **B** and **v** generally have the same Spanish sound, so you may need to ask which letter to write.",
        "La **h** se llama **hache** y normalmente no suena, como en **hola**. **B** y **v** suelen tener el mismo sonido, por lo que puede hacer falta comprobar qué letra escribir."
      ],
      [
        "In much of Spain, **c** before **e / i**, and **z**, sound like th in think. Many other Spanish speakers use an s sound. You may hear either pronunciation.",
        "En buena parte de España, la **c** ante **e / i** y la **z** suenan como th en think. Muchas otras personas hispanohablantes usan un sonido de s. Puedes oír ambas pronunciaciones."
      ]
    ]
  },
  {
    "id": "numbers",
    "title": [
      "4 · Numbers from 0 to 20",
      "4 · Los números del 0 al 20"
    ],
    "intro": [
      "Learn **0–20** in small groups. Then mix the order: can you recognise **trece**, **quince** and **dieciocho** without counting from one?",
      "Aprende **0–20** en grupos pequeños. Después cambia el orden: ¿reconoces **trece**, **quince** y **dieciocho** sin contar desde uno?"
    ],
    "paragraphs": [
      [
        "Write **dieciséis**, **diecisiete**, **dieciocho** and **diecinueve** as one word. **Dieciséis** has an accent on **é**.",
        "Escribe **dieciséis**, **diecisiete**, **dieciocho** y **diecinueve** como una sola palabra. **Dieciséis** lleva tilde en la **é**."
      ]
    ],
    "tables": [
      {
        "headers": [
          [
            "Group",
            "Grupo"
          ],
          [
            "Number words",
            "Palabras"
          ]
        ],
        "rows": [
          [
            "0–5",
            "cero · uno · dos · tres · cuatro · cinco"
          ],
          [
            "6–10",
            "seis · siete · ocho · nueve · diez"
          ],
          [
            "11–15",
            "once · doce · trece · catorce · quince"
          ],
          [
            "16–20",
            "dieciséis · diecisiete · dieciocho · diecinueve · veinte"
          ]
        ]
      }
    ],
    "examples": [
      [
        "12 → doce; 13 → trece; 14 → catorce.",
        "12 → twelve; 13 → thirteen; 14 → fourteen."
      ],
      [
        "Tengo dieciséis años.",
        "I am sixteen years old."
      ],
      [
        "¿Trece o catorce? — Catorce.",
        "Thirteen or fourteen? — Fourteen."
      ]
    ],
    "note": null,
    "checkpoint": {
      "prompt": [
        "Write 17 in Spanish. Which number word from 16–20 has a written accent?",
        "Escribe 17 en español. ¿Qué palabra del 16 al 20 lleva tilde?"
      ],
      "answer": [
        "Diecisiete. Dieciséis is the word with the written accent.",
        "Diecisiete. La palabra que lleva tilde es dieciséis."
      ]
    },
    "tryIt": [
      "Write six digits in a mixed order, say them in Spanish, then cover the words and check again later. Ask a partner to distinguish trece from catorce.",
      "Escribe seis cifras en un orden mezclado, dilas en español y vuelve a comprobarlas más tarde sin mirar las palabras. Pide a un compañero que distinga trece de catorce."
    ],
    "extra": null
  },
  {
    "id": "pronouns",
    "title": [
      "5 · Who are we talking about?",
      "5 · ¿De quién hablamos?"
    ],
    "intro": [
      "Choose the person first, then the verb: **yo tengo**, **tú tienes**, **ella tiene**. The pronouns below show who the sentence is about.",
      "Elige primero la persona y después el verbo: **yo tengo**, **tú tienes**, **ella tiene**. Los pronombres de la tabla indican de quién habla la frase."
    ],
    "paragraphs": [
      [
        "**Nosotros / nosotras** includes you in a group. **Vosotros / vosotras** means several people you are speaking to. **Ellos / ellas** refers to another group.",
        "**Nosotros / nosotras** te incluye en un grupo. **Vosotros / vosotras** se refiere a varias personas a las que hablas. **Ellos / ellas** se refiere a otro grupo."
      ]
    ],
    "tables": [
      {
        "headers": [
          [
            "Pronoun",
            "Pronombre"
          ],
          [
            "Meaning / reference",
            "Significado / referencia"
          ]
        ],
        "rows": [
          [
            "yo",
            [
              "I: the speaker.",
              "Quien habla."
            ]
          ],
          [
            "tú",
            [
              "You: one listener.",
              "Una persona a la que hablas."
            ]
          ],
          [
            "él / ella",
            [
              "He / she: another person.",
              "Otra persona."
            ]
          ],
          [
            "nosotros / nosotras",
            [
              "We: a group including the speaker.",
              "Un grupo que incluye a quien habla."
            ]
          ],
          [
            "vosotros / vosotras",
            [
              "You: several listeners.",
              "Varias personas a las que hablas."
            ]
          ],
          [
            "ellos / ellas",
            [
              "They: other people.",
              "Otras personas."
            ]
          ]
        ]
      }
    ],
    "examples": [
      [
        "Alba tiene trece años. Ella tiene trece años.",
        "Alba is thirteen. She is thirteen."
      ],
      [
        "Alba y Leo tienen catorce años. Ellos tienen catorce años.",
        "Alba and Leo are fourteen. They are fourteen."
      ],
      [
        "Nosotras tenemos doce años.",
        "We are twelve years old."
      ]
    ],
    "note": [
      "You can say **Tengo trece años** without **yo**: the verb already makes the person clear.",
      "Puedes decir **Tengo trece años** sin **yo**: el verbo ya aclara la persona."
    ],
    "checkpoint": {
      "prompt": [
        "Which pronoun includes you and Alba? Which refers to two people you are addressing? Must Tengo trece años begin with yo?",
        "¿Qué pronombre os incluye a Alba y a ti? ¿Cuál se refiere a dos personas a las que hablas? ¿Tiene que empezar Tengo trece años con yo?"
      ],
      "answer": [
        "Nosotros or nosotras includes the speaker. Vosotros or vosotras addresses several listeners. No: tengo already identifies the speaker in this context.",
        "Nosotros o nosotras incluye a quien habla. Vosotros o vosotras se dirige a varias personas. No: tengo ya identifica a quien habla en este contexto."
      ]
    },
    "tryIt": [
      "Point to fictional people on a page: yourself, one listener, Alba, your group and another group. Say the fitting pronoun before adding a verb.",
      "Señala personajes ficticios en una página: tú, una persona que escucha, Alba, tu grupo y otro grupo. Di el pronombre adecuado antes de añadir un verbo."
    ],
    "extra": [
      [
        "Use **nosotras**, **vosotras** and **ellas** for groups described with feminine forms. **Nosotros**, **vosotros** and **ellos** are used for masculine or mixed groups in these examples.",
        "Usa **nosotras**, **vosotras** y **ellas** para grupos descritos con formas femeninas. **Nosotros**, **vosotros** y **ellos** se usan para grupos masculinos o mixtos en estos ejemplos."
      ]
    ]
  },
  {
    "id": "age",
    "title": [
      "6 · Tener: saying your age",
      "6 · Tener: decir la edad"
    ],
    "intro": [
      "To give your age, use **tener + number + años**: **Tengo trece años** means I am thirteen.",
      "Para indicar la edad, usa **tener + número + años**: **Tengo trece años** equivale a I am thirteen en inglés."
    ],
    "paragraphs": [
      [
        "The verb changes with the person. Ask one person **¿Cuántos años tienes?** Ask a group **¿Cuántos años tenéis?**",
        "El verbo cambia según la persona. Pregunta a una persona **¿Cuántos años tienes?** y a un grupo **¿Cuántos años tenéis?**"
      ]
    ],
    "tables": [
      {
        "headers": [
          [
            "Subject",
            "Sujeto"
          ],
          [
            "Present of tener",
            "Presente de tener"
          ]
        ],
        "rows": [
          [
            "yo",
            "tengo"
          ],
          [
            "tú",
            "tienes"
          ],
          [
            "él / ella",
            "tiene"
          ],
          [
            "nosotros / nosotras",
            "tenemos"
          ],
          [
            "vosotros / vosotras",
            "tenéis"
          ],
          [
            "ellos / ellas",
            "tienen"
          ]
        ]
      }
    ],
    "examples": [
      [
        "Yo tengo trece años.",
        "I am thirteen years old."
      ],
      [
        "Tú tienes catorce años.",
        "You are fourteen years old."
      ],
      [
        "Alba tiene doce años.",
        "Alba is twelve years old."
      ],
      [
        "Nosotros tenemos quince años.",
        "We are fifteen years old."
      ],
      [
        "Vosotras tenéis dieciséis años.",
        "You are sixteen years old."
      ],
      [
        "Ellos tienen dieciocho años.",
        "They are eighteen years old."
      ],
      [
        "¿Cuántos años tiene Inés? — Tiene catorce años.",
        "How old is Inés? — She is fourteen years old."
      ]
    ],
    "note": [
      "For age, use **tengo**, not soy or estoy. Remember the accent in **tenéis**.",
      "Para la edad, usa **tengo**, no soy ni estoy. Recuerda la tilde de **tenéis**."
    ],
    "checkpoint": {
      "prompt": [
        "Complete: Nosotras ___ trece años. Vosotros ___ catorce años. Alba y Leo ___ quince años.",
        "Completa: Nosotras ___ trece años. Vosotros ___ catorce años. Alba y Leo ___ quince años."
      ],
      "answer": [
        "Tenemos; tenéis; tienen. Choose by the subject: we, you plural, they.",
        "Tenemos; tenéis; tienen. Elige según el sujeto: nosotras, vosotros, ellos."
      ]
    },
    "tryIt": [
      "Use the lab to keep the age fixed while changing all six persons. Then invent three people of different ages and report their ages without using tengo every time.",
      "Usa el laboratorio para conservar la edad y cambiar las seis personas. Después inventa tres personas con edades diferentes y cuenta sus edades sin usar tengo en todas las frases."
    ],
    "extra": [
      [
        "**Tener** is the dictionary form (to have). The present is irregular: **tengo** adds g; **tienes**, **tiene** and **tienen** use tien-. **Tenemos** and **tenéis** keep ten-.",
        "**Tener** es la forma del diccionario. Su presente es irregular: **tengo** añade g; **tienes**, **tiene** y **tienen** usan tien-. **Tenemos** y **tenéis** conservan ten-."
      ],
      [
        "**Tenemos trece años** means the people in our group are thirteen. For different ages, give separate details: **Alba tiene trece años y Leo tiene catorce años**.",
        "**Tenemos trece años** indica que las personas de nuestro grupo tienen trece. Si las edades son diferentes, da los datos por separado: **Alba tiene trece años y Leo tiene catorce años**."
      ]
    ]
  },
  {
    "id": "feelings",
    "title": [
      "7 · Estar: how you feel",
      "7 · Estar: cómo te encuentras"
    ],
    "intro": [
      "Ask **¿Cómo estás?** Start your answer with **Estoy**: **Estoy bien**, **Estoy fenomenal** or **Estoy fatal**. Add **gracias** and **¿Y tú?**",
      "Pregunta **¿Cómo estás?** Empieza tu respuesta con **Estoy**: **Estoy bien**, **Estoy fenomenal** o **Estoy fatal**. Añade **gracias** y **¿Y tú?**"
    ],
    "paragraphs": [
      [
        "**Bien**, **fenomenal** and **fatal** stay the same: **estoy fenomenal**, **estamos fenomenal**. Descriptions like **cansado / cansada** change: **Alba está cansada**; **ellas están cansadas**.",
        "**Bien**, **fenomenal** y **fatal** no cambian: **estoy fenomenal**, **estamos fenomenal**. Descripciones como **cansado / cansada** sí cambian: **Alba está cansada**; **ellas están cansadas**."
      ]
    ],
    "tables": [
      {
        "headers": [
          [
            "Subject",
            "Sujeto"
          ],
          [
            "Present of estar",
            "Presente de estar"
          ]
        ],
        "rows": [
          [
            "yo",
            "estoy"
          ],
          [
            "tú",
            "estás"
          ],
          [
            "él / ella",
            "está"
          ],
          [
            "nosotros / nosotras",
            "estamos"
          ],
          [
            "vosotros / vosotras",
            "estáis"
          ],
          [
            "ellos / ellas",
            "están"
          ]
        ]
      },
      {
        "headers": [
          [
            "Expression",
            "Expresión"
          ],
          [
            "Meaning",
            "Significado"
          ]
        ],
        "rows": [
          [
            "bien",
            [
              "well / fine",
              "bien"
            ]
          ],
          [
            "muy bien",
            [
              "very well",
              "muy bien"
            ]
          ],
          [
            "fenomenal",
            [
              "great / fantastic",
              "muy bien"
            ]
          ],
          [
            "fatal",
            [
              "terrible / awful",
              "muy mal"
            ]
          ],
          [
            "regular",
            [
              "so-so",
              "ni bien ni mal"
            ]
          ],
          [
            "mal",
            [
              "not well",
              "mal"
            ]
          ],
          [
            "cansado / cansada",
            [
              "tired",
              "con cansancio"
            ]
          ],
          [
            "contento / contenta",
            [
              "happy / pleased",
              "con alegría o satisfacción"
            ]
          ]
        ]
      }
    ],
    "examples": [
      [
        "Estoy bien, gracias. ¿Y tú?",
        "I am fine, thank you. And you?"
      ],
      [
        "Estoy fenomenal, gracias. ¿Y tú?",
        "I am feeling great, thank you. And you?"
      ],
      [
        "Estoy fatal.",
        "I am feeling awful."
      ],
      [
        "¿Cómo está Alba? — Está regular.",
        "How is Alba? — She is so-so."
      ],
      [
        "Nosotras estamos fenomenal.",
        "We are feeling great."
      ],
      [
        "¿Cómo estáis? — Estamos bien.",
        "How are you all? — We are fine."
      ],
      [
        "Ellas están cansadas.",
        "They are tired."
      ]
    ],
    "note": [
      "Keep the accents in **estás**, **está**, **estáis** and **están**. **Estoy** and **estamos** have no accent.",
      "Conserva las tildes de **estás**, **está**, **estáis** y **están**. **Estoy** y **estamos** no llevan tilde."
    ],
    "checkpoint": {
      "prompt": [
        "Choose forms for yo and nosotras: ___ bien; ___ muy bien. Does bien need a plural ending?",
        "Elige las formas de yo y nosotras: ___ bien; ___ muy bien. ¿Necesita bien una terminación de plural?"
      ],
      "answer": [
        "Estoy bien; estamos muy bien. Bien does not take a plural ending.",
        "Estoy bien; estamos muy bien. Bien no lleva una terminación de plural."
      ]
    },
    "tryIt": [
      "Ask how three fictional people are. Answer once for yourself, once for your group and once about Alba. Keep age and feelings in separate sentences.",
      "Pregunta cómo se encuentran tres personajes ficticios. Responde una vez sobre ti, otra sobre tu grupo y otra sobre Alba. Usa frases separadas para la edad y el estado."
    ],
    "extra": null
  },
  {
    "id": "punctuation",
    "title": [
      "8 · Accents and question marks",
      "8 · Tildes y signos de interrogación"
    ],
    "intro": [
      "Spanish questions use **¿** at the start and **?** at the end: **¿Cómo te llamas?** Exclamations use **¡** and **!**: **¡Hola!**",
      "Las preguntas en español usan **¿** al principio y **?** al final: **¿Cómo te llamas?** Las exclamaciones usan **¡** y **!**: **¡Hola!**"
    ],
    "paragraphs": [
      [
        "Keep the accents in **cómo**, **tú** and **Inés**, and the **ñ** in **años**. Names begin with a capital letter.",
        "Conserva las tildes de **cómo**, **tú** e **Inés**, y la **ñ** de **años**. Los nombres empiezan con mayúscula."
      ]
    ],
    "examples": [
      [
        "¿Cómo te llamas?",
        "What is your name?"
      ],
      [
        "Alba, ¿cuántos años tienes?",
        "Alba, how old are you?"
      ],
      [
        "¡Hola, Inés!",
        "Hello, Inés!"
      ],
      [
        "Estoy bien. ¿Y tú?",
        "I am fine. And you?"
      ]
    ],
    "note": [
      "Use the Spanish character buttons beside text answers if you need help typing an accent or **ñ**.",
      "Usa los botones de caracteres españoles junto a las respuestas de texto si necesitas escribir una tilde o **ñ**."
    ],
    "checkpoint": {
      "prompt": [
        "Repair: Como te llamas? Then check whether tu needs an accent in ¿Y tu?",
        "Corrige: Como te llamas? Después comprueba si tu necesita tilde en ¿Y tu?"
      ],
      "answer": [
        "¿Cómo te llamas? and ¿Y tú? need accents and both question marks.",
        "¿Cómo te llamas? y ¿Y tú? necesitan tildes y los dos signos de interrogación."
      ]
    },
    "tryIt": [
      "Write a four-line exchange. Check openings and endings of questions, names, años and the accents in cómo and tú.",
      "Escribe un intercambio de cuatro líneas. Revisa el principio y final de las preguntas, los nombres, años y las tildes de cómo y tú."
    ],
    "extra": [
      [
        "Compare **tú** (you) with **tu** in **tu nombre** (your name). When addressing Alba, add a comma: **Alba, ¿cómo estás?**",
        "Compara **tú** con **tu** en **tu nombre**. Al dirigirte a Alba, añade una coma: **Alba, ¿cómo estás?**"
      ]
    ]
  },
  {
    "id": "help",
    "title": [
      "9 · Ask for help",
      "9 · Pide ayuda"
    ],
    "intro": [
      "If you miss something, use **¿Puedes repetir, por favor?** For slower speech, say **Más despacio, por favor**.",
      "Si no has entendido algo, usa **¿Puedes repetir, por favor?** Para que hablen más despacio, di **Más despacio, por favor**."
    ],
    "paragraphs": [
      [
        "**No entiendo** means I do not understand. Use **¿Cómo se escribe?** for spelling and **¿Qué significa…?** to ask about a meaning.",
        "**No entiendo** indica que no has comprendido. Usa **¿Cómo se escribe?** para comprobar las letras y **¿Qué significa…?** para preguntar un significado."
      ]
    ],
    "examples": [
      [
        "Perdona, no entiendo. ¿Puedes repetir, por favor?",
        "Sorry, I do not understand. Can you repeat, please?"
      ],
      [
        "¿Trece o catorce? — Catorce.",
        "Thirteen or fourteen? — Fourteen."
      ],
      [
        "¿Qué significa apellido?",
        "What does apellido mean?"
      ],
      [
        "Gracias. — De nada.",
        "Thank you. — You are welcome."
      ]
    ],
    "note": null,
    "checkpoint": {
      "prompt": [
        "You heard the age but not the surname. Which question targets your problem: ¿Cómo estás? or ¿Cómo se escribe tu apellido?",
        "Has oído la edad, pero no el apellido. ¿Qué pregunta se centra en tu problema: ¿Cómo estás? o ¿Cómo se escribe tu apellido?"
      ],
      "answer": [
        "¿Cómo se escribe tu apellido? checks the surname. ¿Cómo estás? asks about a state.",
        "¿Cómo se escribe tu apellido? comprueba el apellido. ¿Cómo estás? pregunta por un estado."
      ]
    },
    "tryIt": [
      "Do a second version of your conversation. This time one person must ask for repetition, slower speech or spelling before finishing.",
      "Haz una segunda versión de tu conversación. Esta vez, una persona debe pedir una repetición, hablar más despacio o deletrear antes de terminar."
    ],
    "extra": null
  },
  {
    "id": "culture",
    "title": [
      "10 · Spanish around the world",
      "10 · El español en el mundo"
    ],
    "intro": [
      "Spanish is spoken in **España**, **México**, **Colombia**, **Argentina** and many other places. This unit uses examples from Spain; you will also hear different accents and expressions.",
      "El español se habla en **España**, **México**, **Colombia**, **Argentina** y muchos otros lugares. Esta unidad usa ejemplos de España; también oirás otros acentos y expresiones."
    ],
    "paragraphs": [
      [
        "Many people use two surnames, as in **Inés Ruiz Soto**. Naming patterns vary. Ask **¿Cómo se escribe tu apellido?** when you need to check.",
        "Muchas personas usan dos apellidos, como en **Inés Ruiz Soto**. Los nombres no siguen siempre el mismo modelo. Pregunta **¿Cómo se escribe tu apellido?** cuando necesites comprobarlo."
      ]
    ],
    "examples": [
      [
        "Me llamo Inés Ruiz Soto.",
        "My name is Inés Ruiz Soto."
      ],
      [
        "¿Cómo se escribe tu apellido?",
        "How is your surname spelt?"
      ],
      [
        "España · México · Colombia · Argentina",
        "Spain · Mexico · Colombia · Argentina"
      ]
    ],
    "note": null,
    "checkpoint": {
      "prompt": [
        "Does practising a Spain-based model mean every other pronunciation is wrong? Must every Spanish speaker have two surnames?",
        "¿Practicar un modelo de España significa que todas las demás pronunciaciones son incorrectas? ¿Todas las personas hispanohablantes tienen que tener dos apellidos?"
      ],
      "answer": [
        "No to both. Spanish has valid regional variation, and naming practices vary. Ask people rather than assuming.",
        "No en ambos casos. El español tiene variación regional válida y las prácticas de los nombres varían. Pregunta en lugar de suponer."
      ]
    },
    "tryIt": [
      "Locate the four starting-point countries on a map. Compare the fictional full name with a naming pattern you know. Write one observation and one question, in English or Spanish.",
      "Localiza los cuatro países de partida en un mapa. Compara el nombre completo ficticio con un modelo que conozcas. Escribe una observación y una pregunta, en inglés o español."
    ],
    "extra": null
  }
];
export const readingTexts=[
 {id:'r1',title:['Morning introductions','Presentaciones por la mañana'],text:'Buenos días. Me llamo Inés Ruiz Soto. Tengo catorce años. Estoy muy bien. Mi apellido Ruiz se escribe erre, u, i, zeta. ¿Y tú? ¿Cómo te llamas?',task:['Find the first name, the two surnames, the age and the state. Which expression tells you the time of day?','Busca el nombre, los dos apellidos, la edad y el estado. ¿Qué expresión indica el momento del día?'],answer:['Inés; Ruiz Soto; fourteen; very well. Buenos días suggests morning.','Inés; Ruiz Soto; catorce; muy bien. Buenos días indica la mañana.']},
 {id:'r2',title:['One group, different people','Un grupo con personas diferentes'],text:'Hola. Me llamo Alba. Tengo trece años. Leo tiene quince años. Estamos bien. Inés y Sara tienen catorce años. Ellas están cansadas. Hasta mañana.',task:['Who is thirteen? Who is fifteen? Which two people are fourteen? Find a verb form meaning we are and one meaning they have.','¿Quién tiene trece años? ¿Quién tiene quince? ¿Qué dos personas tienen catorce? Busca una forma de estar para nosotros y una forma de tener para ellas.'],answer:['Alba is thirteen; Leo is fifteen; Inés and Sara are fourteen. Estamos and tienen are the requested forms.','Alba tiene trece años; Leo tiene quince; Inés y Sara tienen catorce. Las formas pedidas son estamos y tienen.']},
 {id:'r3',title:['A detail needs checking','Hay que comprobar un dato'],text:'— Buenas tardes. ¿Cómo te llamas?\n— Me llamo Leo Vega.\n— ¿Cómo se escribe tu apellido?\n— Vega se escribe uve, e, ge, a.\n— ¿Cuántos años tienes?\n— Tengo dieciséis años.\n— Perdona, ¿seis o dieciséis?\n— Tengo dieciséis años.\n— Gracias. Nos vemos.',task:['Record the surname and age. Why does the listener ask again? Find a goodbye and a phrase that politely attracts attention.','Anota el apellido y la edad. ¿Por qué vuelve a preguntar quien escucha? Busca una despedida y una expresión que llama la atención con cortesía.'],answer:['Vega; sixteen. The listener checks whether the number was six or sixteen. Nos vemos closes the conversation; perdona draws attention politely.','Vega; dieciséis. Quien escucha comprueba si el número era seis o dieciséis. Nos vemos cierra la conversación; perdona llama la atención con cortesía.']}
];
export const sessionRoute=[
 ['greetings','Greetings in context','Saludos en contexto','Choose greetings for morning, afternoon and night. Build three short encounters.','Elige saludos para la mañana, la tarde y la noche. Construye tres encuentros breves.'],
 ['names','Names and surnames','Nombres y apellidos','Use fictional identity cards; ask, answer and introduce a partner.','Usa tarjetas de identidad ficticias; pregunta, responde y presenta a un compañero.'],
 ['alphabet','Spelling and checking','Deletrear y comprobar','Practise vowels and letter names, then repair a deliberately misheard name.','Practica vocales y nombres de letras; después aclara un nombre que no se ha oído bien.'],
 ['numbers','Numbers beyond reciting','Números sin recitar','Recognise mixed numbers 0–20 and check ages without the number list.','Reconoce números mezclados del 0 al 20 y comprueba edades sin consultar la lista.'],
 ['pronouns','People and perspectives','Personas y perspectivas','Identify speaker, listener and groups; replace names with pronouns.','Identifica quién habla, quién escucha y los grupos; sustituye nombres por pronombres.'],
 ['age','Tener and age','Tener y la edad','Explore all six forms, then report several different fictional ages.','Experimenta con las seis formas y cuenta varias edades ficticias diferentes.'],
 ['feelings','Estar and feelings','Estar y los estados','Compare age with state; ask about individuals and a group.','Compara la edad y el estado; pregunta por personas y por un grupo.'],
 ['punctuation','Writing and repairing','Escribir y corregir','Build a written exchange and check accents, signs and agreement.','Construye un intercambio escrito y revisa tildes, signos y concordancia.'],
 ['culture','Names and communities','Nombres y comunidades','Read the short texts; explore four places and compare naming practices.','Lee los textos breves; explora cuatro lugares y compara prácticas de nombres.'],
 ['help','Conversation strategies','Estrategias de conversación','Ask for repetition, slower speech and spelling in a new encounter.','Pide repetición, hablar más despacio y deletrear en un encuentro nuevo.'],
 ['names','A meeting with a purpose','Un encuentro con un propósito','Complete the guided meeting, then create a new identity exchange.','Completa el encuentro guiado y crea después un intercambio con identidades nuevas.'],
 ['age','Return, retrieve and transfer','Volver, recordar y transferir','Revisit selected topics after a gap; exchange roles and introduce a group.','Vuelve a algunos temas tras un intervalo; intercambia los papeles y presenta a un grupo.']
];
export const communicationTasks=[
 {title:['1 · Check the welcome list','1 · Comprueba la lista de bienvenida'],instructions:['With a partner, each invent three identities with a first name, surname and age. Keep your own list hidden. Ask questions and spell names until you can make an accurate copy of your partner’s list. Compare only at the end. Alone, cover a reading text and reconstruct its details, then check.','Con un compañero, inventa tres identidades con nombre, apellido y edad. Cada uno oculta su lista. Haz preguntas y deletrea hasta poder copiar correctamente la lista de tu compañero. Comparad solo al final. Si estás solo, tapa un texto de lectura, reconstruye sus datos y comprueba después.'],outcome:['A checked list of three people, with one corrected detail.','Una lista comprobada de tres personas con un dato corregido.']},
 {title:['2 · Welcome at three times of day','2 · Da la bienvenida en tres momentos del día'],instructions:['Create three short encounters: morning, afternoon and night. Change the greeting and goodbye, use a fictional full name, ask an age and include one request for help. Swap roles so you both ask and answer. Alone, write both sides.','Crea tres encuentros breves: por la mañana, por la tarde y por la noche. Cambia el saludo y la despedida, usa un nombre completo ficticio, pregunta la edad e incluye una petición de ayuda. Intercambiad los papeles para preguntar y responder. Si estás solo, escribe ambas partes.'],outcome:['Three exchanges whose greetings fit their context.','Tres intercambios con saludos adecuados al contexto.']},
 {title:['3 · Introduce your group','3 · Presenta a tu grupo'],instructions:['Invent four people. Two share an age and two have different ages. Introduce them using se llama / se llaman as useful models; give ages with tiene / tienen and states with está / están. Include your fictional self with tenemos and estamos when the meaning fits.','Inventa cuatro personas. Dos tienen la misma edad y dos tienen edades diferentes. Preséntalas usando se llama / se llaman como modelos útiles; indica edades con tiene / tienen y estados con está / están. Incluye tu identidad ficticia con tenemos y estamos cuando el significado lo permita.'],outcome:['A short group introduction with accurate singular and plural forms.','Una breve presentación de grupo con formas de singular y plural correctas.']}
];
export const additionalPhrases=[
 ['night','Buenas noches','Good evening / Good night','Saludo o despedida por la noche.'],['goodbye','Adiós','Goodbye','Despedida general.'],['tomorrow','Hasta mañana','See you tomorrow','Despedida hasta el día siguiente.'],['soon','Hasta pronto','See you soon','Despedida con intención de volver a verse pronto.'],['see-you','Nos vemos','See you','Despedida informal.'],['how-going','¿Qué tal?','How is it going?','Pregunta general de saludo.'],['surname','¿Cuál es tu apellido?','What is your surname?','Pregunta por un apellido.'],['surnames','¿Cuáles son tus apellidos?','What are your surnames?','Pregunta por los apellidos.'],['nice','Mucho gusto','Nice to meet you','Expresa satisfacción al conocer a alguien.'],['welcome','De nada','You are welcome','Responde a un agradecimiento.'],['sorry','Perdona','Excuse me / Sorry','Llama la atención o pide disculpas.'],['meaning','¿Qué significa…?','What does … mean?','Pregunta por un significado.'],['plural-age','¿Cuántos años tenéis?','How old are you all?','Pregunta la edad de varias personas.'],['plural-feeling','¿Cómo estáis?','How are you all?','Pregunta cómo se encuentran varias personas.'],['fantastic','Estoy fenomenal.','I am feeling great.','Di que te encuentras muy bien.'],['awful','Estoy fatal.','I am feeling awful.','Di que te encuentras muy mal.'],['spell-answer','Mi nombre se escribe…','My name is spelt…','Empieza una respuesta completa para deletrear tu nombre.']
];

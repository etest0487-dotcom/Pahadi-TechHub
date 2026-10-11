import { PipelineStage, HardwarePart, GlossaryItem, QuizQuestion, AssemblyPart } from '../types';

export const HERO_ASSETS = {
  heroBanner: '/src/assets/images/pahadi_computer_hero_1791705247914.jpg',
  pcDiagram: '/src/assets/images/pahadi_pc_components_diagram_1791705263887.jpg',
  mascot: '/src/assets/images/pahadi_mascot_guide_1791705277071.jpg',
};

export const USER_OPENING_QUOTE = {
  pahadi: "बल, दगड़ियों! (हे दोस्तों!) आज हम सीखला कि ई Computer आख़िर क्या चीज़ छ और ईं कैयां काम करद। जैसे पहाड़ी में बिना चाय और मंडुवे की रोटी के दिन नी बणद, वैसे ही आज की दुनिया में बिना कंप्यूटर के काम नी चलद।",
  hindi: "अरे दोस्तों! आज हम सीखेंगे कि यह कंप्यूटर आखिर क्या चीज़ है और यह कैसे काम करता है। जैसे पहाड़ों में बिना कड़क चाय और मंडुवे की रोटी के दिन नहीं शुरू होता, वैसे ही आज के युग में बिना कंप्यूटर के कोई काम नहीं चल सकता।",
  english: "Hey friends! Today we will learn what this computer really is and how it works. Just as a day in the Himalayan hills cannot start without hot spiced tea and finger-millet (Manduwa) flatbread, in modern times life cannot move forward without computers."
};

export const CREATOR_PROFILE = {
  name: "आनंद कुमार (Anand Kumar)",
  englishName: "Anand Kumar",
  homeLocation: "बोराआगर, जाडापानी (Boraagar, Jarapani)",
  englishLocation: "Boraagar Jarapani (Uttarakhand)",
  welcomeNote: {
    pahadi: "बोराआगर, जाडापानी से आनंद कुमार जी की तरफ से सभी दगड़ियों को सादर प्रणाम व प्यार!",
    hindi: "बोराआगर, जाडापानी से आनंद कुमार की ओर से सभी मित्रों का पाठशाला में हार्दिक स्वागत!",
    english: "Welcome to Pahadi Computer Pathshala by Anand Kumar, from Boraagar Jarapani!"
  }
};


export const PIPELINE_STAGES: PipelineStage[] = [
  {
    id: 'input',
    order: 1,
    title: {
      pahadi: '1. इनपुट (कच्चा माल / सामग्री)',
      hindi: '1. इनपुट (कच्ची सामग्री / डेटा प्रविष्टि)',
      english: '1. Input (Raw Ingredients / Data Entry)',
    },
    analogy: {
      pahadi: 'जैसे चाय बणाण खातिर अदरक, कुटी पत्ती, पाणी व मंडुवे का आटा चईंद। बिना सामग्री चूल्हा मा का बणलू?',
      hindi: 'जैसे चाय बनाने के लिए अदरक, चायपत्ती, पानी और मंडुवे की रोटी के लिए आटा चाहिए, वैसे ही कंप्यूटर को काम शुरू करने के लिए निर्देश और डाटा चाहिए।',
      english: 'Just as preparing tea requires crushed ginger, tea leaves, water, and manduwa flour, a computer needs instructions and raw data to initiate work.',
    },
    techConcept: {
      pahadi: 'उपयोगकर्ता द्वारा कीबोर्ड, माउस या माइक से भेजा गया रॉ डेटा (Raw Data)।',
      hindi: 'उपयोगकर्ता द्वारा कीबोर्ड, माउस, माइक या कैमरा से भेजा गया रॉ डेटा (Raw Data)।',
      english: 'Raw data and user commands transmitted via peripherals like keyboards, mice, microphones, or webcams.',
    },
    kitchenEquivalent: {
      pahadi: 'अदरक, चायपत्ती, दूध, गुड़, मंडुवे का आटा',
      hindi: 'अदरक, चायपत्ती, दूध, गुड़, मंडुवे का आटा',
      english: 'Crushed ginger, tea leaves, milk, jaggery, millet flour',
    },
    hardwareExamples: [
      { pahadi: 'कीबोर्ड (Keyboard)', hindi: 'कीबोर्ड (Keyboard)', english: 'Keyboard' },
      { pahadi: 'माउस (Mouse)', hindi: 'माउस (Mouse)', english: 'Mouse' },
      { pahadi: 'माइक (Microphone)', hindi: 'माइक (Microphone)', english: 'Microphone' },
      { pahadi: 'वेबकैम (Webcam)', hindi: 'वेबकैम (Webcam)', english: 'Webcam' },
    ],
    iconName: 'Keyboard',
    statusBadge: 'INCOMING DATA',
  },
  {
    id: 'ram',
    order: 2,
    title: {
      pahadi: '2. रैम (कामकाजी थाली / परात)',
      hindi: '2. रैम मेमोरी (कार्यकारी पटल / थाली)',
      english: '2. RAM (Active Rolling Platter / Workspace)',
    },
    analogy: {
      pahadi: 'ई छ रोटी गूंधण वाली परात और चाय छानने की छलनी! जब तक काम चलणू छ, आटा थाली मा रौंद। चूल्हा बुझ्यो तो थाली धो के खाली!',
      hindi: 'रैम रसोई की वह थाली है जहां अभी तुरंत काम हो रहा है। यह बहुत तेज़ है पर अस्थायी (Volatile) है—बिजली जाते ही इसमें रखा काम मिट जाता है।',
      english: 'RAM is the kitchen platter where dough is being kneaded right now. It is ultra-fast but volatile—if the power cuts, the platter is wiped clean!',
    },
    techConcept: {
      pahadi: 'अस्थायी हाई-स्पीड मेमोरी जो वर्तमान मा चल रहे प्रोग्राम्स का डेटा संभालद।',
      hindi: 'अस्थायी हाई-स्पीड मेमोरी (Volatile Memory) जो वर्तमान में चल रहे ऐप्स और डेटा को तत्काल सीपीयू को उपलब्ध कराती है।',
      english: 'Volatile high-speed temporary memory providing immediate microsecond access for running applications to the CPU.',
    },
    kitchenEquivalent: {
      pahadi: 'आटा गूंधने की परात व चाय छानने का कप',
      hindi: 'आटा गूंधने की परात व चाय छानने का कप',
      english: 'Kneading platter and active tea pouring tumbler',
    },
    hardwareExamples: [
      { pahadi: 'DDR4 / DDR5 RAM', hindi: 'DDR4 / DDR5 RAM', english: 'DDR4 / DDR5 RAM' },
      { pahadi: 'कैश मेमोरी (L1/L2/L3)', hindi: 'कैश मेमोरी (Cache)', english: 'L1/L2/L3 Cache' },
    ],
    iconName: 'Layers',
    statusBadge: 'WORKING BUFFER',
  },
  {
    id: 'cpu',
    order: 3,
    title: {
      pahadi: '3. सीपीयू (मुखिया जी / चूल्हे की आग)',
      hindi: '3. सीपीयू (कंप्यूटर मस्तिष्क / चूल्हे का ताप)',
      english: '3. CPU (Village Head / Hearth Fire & Chef)',
    },
    analogy: {
      pahadi: 'ई छ गाँव का सयाना मुखिया जी और भानसे का भड़कता चूल्हा! तय करद कि चाय कतगी उबलेगी और रोटी पर कतगा घी लगेगो।',
      hindi: 'सीपीयू कंप्यूटर का दिमाग है। यह सभी गणनाएं (Maths), तुलनाएं (Logic) और निर्देशों का पालन सेकंड के अरबोंवें हिस्से में करता है।',
      english: 'The CPU is the wise village elder and the roaring hearth flame! It makes all logical decisions, calculates arithmetic, and directs every step in nanoseconds.',
    },
    techConcept: {
      pahadi: 'ALU और Control Unit जो प्रति सेकंड अरबों हिसाब (GHz) लगांदा।',
      hindi: 'Arithmetic Logic Unit (ALU) + Control Unit (CU) जो प्रति सेकंड अरबों क्लॉक साइकल (GHz) में निर्देशों को प्रोसेस करते हैं।',
      english: 'The Arithmetic Logic Unit (ALU) and Control Unit (CU) executing billions of clock cycles per second (GHz).',
    },
    kitchenEquivalent: {
      pahadi: 'जलती आग, कड़छी और पकाने वाला रसोइया',
      hindi: 'जलती आग, कड़छी और पकाने वाला रसोइया',
      english: 'Hearth blaze, stirring ladle, and the master chef',
    },
    hardwareExamples: [
      { pahadi: 'Intel Core / AMD Ryzen', hindi: 'Intel Core / AMD Ryzen', english: 'Intel Core / AMD Ryzen' },
      { pahadi: 'Apple M-Series Processor', hindi: 'Apple M-Series', english: 'Apple Silicon' },
    ],
    iconName: 'Cpu',
    statusBadge: 'PROCESSING ALU',
  },
  {
    id: 'storage',
    order: 4,
    title: {
      pahadi: '4. हार्ड डिस्क / SSD (कोठार - सुरक्षित गोदाम)',
      hindi: '4. स्टोरेज ड्राइव (कोठार - स्थायी अन्न भंडार)',
      english: '4. Permanent Storage (Kothaar Granary / SSD)',
    },
    analogy: {
      pahadi: 'पहाड़ों का लकड़ी का भारी कोठार! जां साल भर का मंडुवा, झंगोरा और लाल चावल सुरक्षित रौंद। बिजली जाव या आव, सामान कख नी जांद।',
      hindi: 'यह कंप्यूटर का पक्का गोदाम है। आपकी फोटो, गाने, फाइलें और विंडोज यहीं हमेशा के लिए सुरक्षित रहते हैं, चाहे कंप्यूटर बंद ही क्यों न हो।',
      english: 'The traditional cedar-wood grain storehouse (Kothaar)! Harvested millet, pulses, and spices remain secure for decades regardless of weather or power cuts.',
    },
    techConcept: {
      pahadi: 'नॉन-वोलेटाइल फ्लैश स्टोरेज जो हमेशा के लिए फाइलें सहेजद।',
      hindi: 'गैर-अस्थायी स्टोरेज (Non-Volatile Flash NAND SSD / Magnetic HDD) जो हमेशा के लिए फाइलें सहेजता है।',
      english: 'Non-volatile flash NAND SSD or magnetic HDD storage retaining operating systems, software, and personal files indefinitely without electrical power.',
    },
    kitchenEquivalent: {
      pahadi: 'अनाज का कोठार, मसालों के बंद डिब्बे, घी का पीपा',
      hindi: 'अनाज का कोठार, मसालों के बंद डिब्बे, घी का पीपा',
      english: 'Wooden grain vault, sealed spice jars, clarified butter crock',
    },
    hardwareExamples: [
      { pahadi: 'NVMe M.2 SSD', hindi: 'NVMe M.2 SSD', english: 'NVMe M.2 SSD' },
      { pahadi: 'SATA SSD / HDD', hindi: 'SATA SSD / HDD', english: 'SATA SSD / HDD' },
    ],
    iconName: 'HardDrive',
    statusBadge: 'NON-VOLATILE STORE',
  },
  {
    id: 'output',
    order: 5,
    title: {
      pahadi: '5. आउटपुट (गरम चाय की चुस्की व परोसी रोटी)',
      hindi: '5. आउटपुट (तैयार परिणाम / स्वादिष्ट भोजन)',
      english: '5. Output (Steaming Tea Sip & Served Feast)',
    },
    analogy: {
      pahadi: 'कांसे की थाली मा गरमा-गरम मंडुवे की रोटी, तिल की चटनी और स्टील के गिलास मा कड़क अदरक की चाय! मेहनत का मीठो फल!',
      hindi: 'प्रोसेसिंग के बाद जो अंतिम परिणाम आपकी स्क्रीन पर दिखता है, स्पीकर से सुनाई देता है या प्रिंटर से छपकर निकलता है, वही आउटपुट है।',
      english: 'Hot steaming Manduwa flatbread topped with pure cow ghee served alongside fragrant ginger tea! The tangible reward of culinary processing!',
    },
    techConcept: {
      pahadi: 'प्रोसेस्ड डेटा को मॉनिटर या स्पीकर पर दिखाना।',
      hindi: 'प्रोसेस्ड डेटा को मानव-पठनीय रूप (Human-Readable Form) में मॉनिटर, साउंड या पेपर पर प्रस्तुत करना।',
      english: 'Rendering processed algorithmic output into human-perceptible displays, audio vibrations, or printed physical sheets.',
    },
    kitchenEquivalent: {
      pahadi: 'परोसी हुई गरम चाय की प्याली व घी चुपड़ी रोटी',
      hindi: 'परोसी हुई गरम चाय की प्याली व घी चुपड़ी रोटी',
      english: 'Served hot spiced chai tumbler and ghee-glazed bread',
    },
    hardwareExamples: [
      { pahadi: 'मॉनिटर स्क्रीन (Display)', hindi: 'मॉनिटर स्क्रीन (Display)', english: 'Monitor Screen' },
      { pahadi: 'स्पीकर (Speakers)', hindi: 'स्पीकर (Speakers)', english: 'Audio Speakers' },
      { pahadi: 'प्रिंटर (Printer)', hindi: 'प्रिंटर (Printer)', english: 'Paper Printer' },
    ],
    iconName: 'Monitor',
    statusBadge: 'READY OUTPUT',
  },
];

export const HARDWARE_PARTS: HardwarePart[] = [
  {
    id: 'cpu',
    name: {
      pahadi: 'CPU (सेंट्रल प्रोसेसिंग यूनिट)',
      hindi: 'CPU (सेंट्रल प्रोसेसिंग यूनिट)',
      english: 'CPU (Central Processing Unit)',
    },
    metaphorTitle: {
      pahadi: 'गाँव का मुखिया जी (दगड़ियों का दिमाग)',
      hindi: 'गाँव का मुखिया जी (कंप्यूटर का मस्तिष्क)',
      english: 'The Village Elder / Head Chef (Mukhia Ji)',
    },
    analogy: {
      pahadi: 'जैसे गाँव में कोई भी फैसला बिना प्रधान जी या घर के बड़े-बुजुर्ग के नी हुंद, वैसे ही कंप्यूटर में हर एक गिनती और फैसला CPU ही करद।',
      hindi: 'जैसे गाँव में कोई भी फैसला बिना प्रधान जी या घर के बड़े-बुजुर्ग के नहीं होता, वैसे ही कंप्यूटर में हर एक गणना और फैसला CPU ही करता है।',
      english: 'Just as no important decision in a Himalayan village is taken without consulting the village elder, every single calculation and instruction is mediated by the CPU.',
    },
    technicalRole: {
      pahadi: 'कंप्यूटर का मुख्य मस्तिष्क जो सारे प्रोग्राम्स को फेच, डिकोड और पूरा करद।',
      hindi: 'कंप्यूटर का मुख्य मस्तिष्क। यह सारे प्रोग्राम्स के निर्देशों को फेच (Fetch), डिकोड (Decode) और निष्पादित (Execute) करता है।',
      english: 'The primary microchip executing instructions sequentially through Fetch-Decode-Execute cycles across multiple silicon cores.',
    },
    simpleExplanation: {
      pahadi: 'जितनी तेज़ इसकी गति (Ghz) होगी, उतनी जल्दी आपकी चाय उबलेगी (काम होगा)!',
      hindi: 'कंप्यूटर का दिल और दिमाग। जितनी तेज़ इसकी गति होगी, उतनी तीव्रता से हर कार्य संपन्न होगा।',
      english: 'The brain and engine of your system. Higher clock speed (GHz) means faster task execution and rapid responsiveness.',
    },
    keySpecs: ['क्लॉक स्पीड (3.5 - 5.0+ GHz)', 'कोर्स (Cores: 6, 8, 16 Cores)', 'थ्रेड्स (16 - 32 Threads)'],
    funFact: {
      pahadi: 'आजकल का सीपीयू एक सेकंड मा 4 अरब से ज्यादा हिसाब-किताब लगा सकद, जतगा हम जिंदगी भर मा मंडुवे के दाणे नी गिन सकदा!',
      hindi: 'आधुनिक सीपीयू एक सेकंड में 4 अरब से अधिक गणनाएं कर सकता है, जितने हम जीवन भर में बाजरे के दाने नहीं गिन सकते!',
      english: 'A modern CPU executes over 4 billion cycles per second—more calculations in one heartbeat than a human could count millet grains in a lifetime!',
    },
    category: 'core',
    slotType: 'LGA / AM5 Socket',
  },
  {
    id: 'ram',
    name: {
      pahadi: 'RAM (रैंडम एक्सेस मेमोरी)',
      hindi: 'RAM (रैंडम एक्सेस मेमोरी)',
      english: 'RAM (Random Access Memory)',
    },
    metaphorTitle: {
      pahadi: 'रसोई की थाली व परात (कामकाजी जगह)',
      hindi: 'रसोई की थाली व परात (कार्यकारी पटल)',
      english: 'The Kitchen Rolling Platter / Active Countertop',
    },
    analogy: {
      pahadi: 'जब दाजी रोटी बणांद, तो आटा थाली मा राखद। जितनी बड़ी थाली होगी, उतनी ज्यादा रोटियां एक साथ बेल सकला। पर काम खत्म होते ही थाली धुल जांद।',
      hindi: 'जब रोटी बनती है तो आटा थाली में रखते हैं। जितनी बड़ी थाली होगी, उतनी अधिक रोटियां एक साथ बेल सकेंगे। पर कार्य पूर्ण होते ही थाली धुल जाती है।',
      english: 'When making bread, flour sits on the rolling platter. A wider platter allows rolling multiple rotis at once. But once cooking ends, the platter is washed clean.',
    },
    technicalRole: {
      pahadi: 'सुपर-फास्ट वोलेटाइल मेमोरी जो एक्टिव ऐप्स का डेटा संभालद।',
      hindi: 'सुपर-फास्ट वोलेटाइल मेमोरी जो वर्तमान में सक्रिय प्रोग्रामों का डेटा संभालती है ताकि सीपीयू तुरंत काम कर सके।',
      english: 'Volatile high-bandwidth memory buffering active process states, eliminating sluggish round-trips to secondary storage.',
    },
    simpleExplanation: {
      pahadi: 'मल्टीटास्किंग की चाबी। 16GB रैम होने से वीडियो, गेम और गाने एक साथ मक्खन जैसे चलद।',
      hindi: 'मल्टीटास्किंग की रीढ़। 16GB या 32GB रैम से कई एप्लीकेशन एक साथ निर्बाध चलते हैं।',
      english: 'The powerhouse of multitasking. Ample RAM (16GB - 32GB) keeps browser tabs, games, and video editors gliding simultaneously.',
    },
    keySpecs: ['क्षमता (8GB, 16GB, 32GB DDR5)', 'स्पीड (4800 - 6400 MT/s)', 'वोलेटाइल (Volatile Memory)'],
    funFact: {
      pahadi: 'अगर रैम कम होगी, तो कंप्यूटर ऐसे सुस्त हो जांद जैसे भारी भरकम लकड़ी का गट्ठर सिर पर रख के खड़ी चढ़ाई चढ़ना!',
      hindi: 'यदि रैम कम हो, तो कंप्यूटर ऐसे धीमा हो जाता है जैसे सिर पर भारी गट्ठर लेकर खड़ी पहाड़ी चढ़ना!',
      english: 'Insufficient RAM forces the OS into disk paging, slowing your PC like climbing a steep Himalayan cliff carrying heavy firewood!',
    },
    category: 'memory',
    slotType: 'DDR5 DIMM Slots',
  },
  {
    id: 'motherboard',
    name: {
      pahadi: 'मदरबोर्ड (Motherboard)',
      hindi: 'मदरबोर्ड (Motherboard)',
      english: 'Motherboard (Main Circuit Board)',
    },
    metaphorTitle: {
      pahadi: 'घर का आंगन व पंचायती चौपाल',
      hindi: 'घर का आंगन व ग्राम चौपाल',
      english: 'The Village Courtyard & Stone Foundation',
    },
    analogy: {
      pahadi: 'गाँव का वह बड़ा आंगन जहां सभी रिश्तेदार, दोस्त, चूल्हा और बैठक एक साथ जुड़ी रहती हैं। इसके बिना कोई एक-दूसरे से बात ही नहीं कर सकता।',
      hindi: 'गाँव का वह मुख्य आंगन जहां सभी परिजन, चूल्हा और बैठक आपस में जुड़े रहते हैं। इसके बिना कोई एक-दूसरे से संवाद नहीं कर सकता।',
      english: 'The central stone courtyard where all relatives, hearths, and rooms interconnect. Without this foundation, no one can talk to each other.',
    },
    technicalRole: {
      pahadi: 'मुख्य सर्किट बोर्ड (PCB) जो सारे पुर्जों को डेटा की पगडंडियों से जोड़द।',
      hindi: 'मुख्य सर्किट बोर्ड (PCB) जो CPU, RAM, GPU, स्टोरेज और सभी पोर्ट्स को कॉपर बसों के जरिए आपस में जोड़ता है।',
      english: 'The primary multilayer printed circuit board routing high-speed electrical traces, power planes, and data buses across all system hardware.',
    },
    simpleExplanation: {
      pahadi: 'वह बड़ी प्लेट जिस पर सब पुर्जे फिट होते हैं। यह कंप्यूटर की रीढ़ की हड्डी है।',
      hindi: 'वह मुख्य प्लेट जिस पर सभी उपकरण स्थापित होते हैं। यह कंप्यूटर का आधारभूत ढांचा है।',
      english: 'The main backbone board onto which every chip, wire, and expansion card plugs seamlessly.',
    },
    keySpecs: ['फॉर्म फैक्टर (ATX, Micro-ATX)', 'चिपसेट (AMD B650, Intel Z790)', 'PCIe 5.0 High Speed Lanes'],
    funFact: {
      pahadi: 'मदरबोर्ड के अंदर बाल से भी पतले तांबे के हजारों रास्ते होते हैं, जैसे पहाड़ों की पगडंडियां!',
      hindi: 'मदरबोर्ड के भीतर बाल से भी पतले तांबे के हजारों रास्ते होते हैं, जैसे पर्वतीय पगडंडियां!',
      english: 'A motherboard packs thousands of copper traces thinner than a human hair, resembling intricate mountain footpaths!',
    },
    category: 'core',
    slotType: 'ATX Chassis Mounting Points',
  },
  {
    id: 'ssd',
    name: {
      pahadi: 'SSD / हार्ड डिस्क (Storage)',
      hindi: 'SSD / हार्ड डिस्क (स्थायी स्टोरेज)',
      english: 'SSD / Solid State Drive (Storage)',
    },
    metaphorTitle: {
      pahadi: 'अनाज का कोठार (सुरक्षित अन्न भंडार)',
      hindi: 'अनाज का कोठार (सुरक्षित अन्न भंडार)',
      english: 'The Harvest Granary (Kothaar)',
    },
    analogy: {
      pahadi: 'जैसे पहाड़ी घरों में देवदार की लकड़ी का मजबूत कोठार होता है जहां सालभर का अनाज और तांबे के बर्तन सुरक्षित रहते हैं।',
      hindi: 'जैसे पर्वतीय घरों में देवदार की लकड़ी का सुदृढ़ कोठार होता है जहां वर्षभर का अनाज और बर्तन सुरक्षित रहते हैं।',
      english: 'Like the rugged Himalayan cedar-wood granary where grain, dried beans, and family heirlooms rest safe from winter frosts.',
    },
    technicalRole: {
      pahadi: 'स्थायी स्टोरेज जो बिना बिजली के भी आपकी फाइलें महफूज रखद।',
      hindi: 'गैर-अस्थायी स्टोरेज (Non-Volatile Storage) जो ऑपरेटिंग सिस्टम और फाइलों को बिजली कटने के बाद भी हमेशा सुरक्षित रखता है।',
      english: 'Non-volatile solid-state NAND flash storage persisting the operating system, games, and personal libraries without requiring continuous power.',
    },
    simpleExplanation: {
      pahadi: 'आपका डिजिटल संदूक। SSD पुरानी हार्ड डिस्क से 15 गुना तेज हुंद।',
      hindi: 'आपका पक्का डिजिटल संदूक। NVMe SSD पुरानी हार्ड डिस्क से 10 से 20 गुना अधिक तीव्र होती है।',
      english: 'Your permanent digital vault. NVMe SSDs read and write data 15 to 30 times faster than mechanical spin drives.',
    },
    keySpecs: ['क्षमता (1TB, 2TB NVMe M.2)', 'रीड स्पीड (up to 7400 MB/s)', 'नॉन-वोलेटाइल (Permanent Safe)'],
    funFact: {
      pahadi: 'कोठार में रखा अनाज जैसे सालों तक सुरक्षित रहता है, वैसे ही SSD में आपकी यादें हमेशा सलामत रहती हैं!',
      hindi: 'कोठार में रखा अनाज जैसे वर्षों तक सुरक्षित रहता है, वैसे ही SSD में आपकी यादें सदा सुरक्षित रहती हैं!',
      english: 'Just as heirloom grains stay viable for years in dry mountain vaults, SSD cells hold your photos safely without degradation!',
    },
    category: 'memory',
    slotType: 'M.2 NVMe Slot',
  },
  {
    id: 'gpu',
    name: {
      pahadi: 'GPU (ग्राफिक्स कार्ड)',
      hindi: 'GPU (ग्राफिक्स प्रोसेसिंग यूनिट)',
      english: 'GPU (Graphics Processing Unit)',
    },
    metaphorTitle: {
      pahadi: 'गाँव का लोक-चित्रकार (ऐपण बनाने वाला कलाकार)',
      hindi: 'गाँव का लोक-चित्रकार (ऐपण कलाकार)',
      english: 'The Folk Aipan Artist & Muralist',
    },
    analogy: {
      pahadi: 'जैसे त्योहारों में गाँव की दीदियां देहली पर अद्भुत ऐपण (Aipan) और रंगोली सजाती हैं, वैसे ही GPU मॉनिटर पर खूबसूरत 3D रंग और खेल बनांद।',
      hindi: 'जैसे त्योहारों में गाँव की कलाकार देहरी पर मनोरम ऐपण और रंगोली सजाती हैं, वैसे ही GPU स्क्रीन पर सजीव 3D दृश्य और खेल बनाता है।',
      english: 'Like folk artisans hand-painting ceremonial Aipan geometric murals across mountain thresholds, the GPU paints millions of vivid screen pixels per frame.',
    },
    technicalRole: {
      pahadi: 'हजारों नन्हे कोर्स का समानांतर प्रोसेसर जो वीडियो और 3D रेंडरिंग करद।',
      hindi: 'समानांतर प्रोसेसर (Parallel Processor) जो लाखों पिक्सल, 3D गेम्स, वीडियो रेंडरिंग और AI गणनाओं को एक साथ संसाधित करता है।',
      english: 'Massively parallel computing silicon tailored to calculate geometry shaders, ray-traced lighting, and matrix arithmetic for AI and gaming.',
    },
    simpleExplanation: {
      pahadi: 'शानदार गेम खेलने और 4K वीडियो देखने के लिए खास विजुअल जादूगर।',
      hindi: 'उत्कृष्ट गेमिंग और उच्च गुणवत्ता वाले वीडियो के लिए विशेष दृश्य संसाधक।',
      english: 'The ultimate visual wizard dedicated to fluid 144Hz 4K gaming, crisp video rendering, and photorealistic spatial rendering.',
    },
    keySpecs: ['VRAM (8GB - 24GB GDDR6X)', 'CUDA Cores (हजारों कोर)', 'रे ट्रेसिंग (Ray Tracing)'],
    funFact: {
      pahadi: 'CPU अकेला तस्वीर बनाए तो थक जाए, पर GPU के पास हजारों नन्हे कलाकार होते हैं जो एक साथ काम करते हैं!',
      hindi: 'यदि CPU अकेला चित्र बनाए तो समय लगेगा, पर GPU के पास हजारों समर्पित शिल्पी होते हैं जो एक साथ हर बिंदु रंगते हैं!',
      english: 'While a CPU works like a lone master calligrapher, a GPU deploys thousands of agile painters coloring every single pixel at once!',
    },
    category: 'graphics',
    slotType: 'PCIe x16 Expansion Slot',
  },
  {
    id: 'psu',
    name: {
      pahadi: 'PSU (पावर सप्लाई यूनिट)',
      hindi: 'PSU (विद्युत आपूर्ति इकाई)',
      english: 'PSU (Power Supply Unit)',
    },
    metaphorTitle: {
      pahadi: 'पनचक्की / घराट की जलधारा (ऊर्जा का स्रोत)',
      hindi: 'पनचक्की / घराट की जलधारा (ऊर्जा स्रोत)',
      english: 'The Rushing Stream & Watermill (Gharaat)',
    },
    analogy: {
      pahadi: 'जैसे गदेरे (पहाड़ी नाले) का बहता पानी घराट के पहिये को घुमाता है और ऊर्जा देता है, वैसे ही PSU घर की 220V बिजली को सही वोल्टेज में बदलता है।',
      hindi: 'जैसे पर्वतीय जलधारा घराट के पहिए को घुमाकर ऊर्जा देती है, वैसे ही PSU घर की बिजली को शुद्ध और नियंत्रित वोल्टेज में बदलती है।',
      english: 'Like the gushing mountain brook channeling steady hydro power into the stone watermill, the PSU converts erratic wall AC power into clean, regulated DC electricity.',
    },
    technicalRole: {
      pahadi: 'घर की 220V AC बिजली को सुरक्षित 12V, 5V, 3.3V DC मा बदलद।',
      hindi: 'दीवार से आने वाली 220V प्रत्यावर्ती धारा (AC) को कंप्यूटर के नाजुक घटकों के लिए स्थिर 12V, 5V और 3.3V दिष्ट धारा (DC) में रूपांतरित करता है।',
      english: 'Power supply unit stepping down high-voltage AC wall power into steady, ripple-free +12V, +5V, and +3.3V DC rails with overload protection.',
    },
    simpleExplanation: {
      pahadi: 'कंप्यूटर का दिल जो हर अंग को उसकी ज़रूरत के हिसाब से शुद्ध बिजली पहुंचाता है।',
      hindi: 'कंप्यूटर का ऊर्जा केंद्र जो हर पुर्जे को आवश्यक संतुलित धारा उपलब्ध कराता है।',
      english: 'The electrical powerhouse feeding clean, calibrated energy to every sensitive chip inside the rig.',
    },
    keySpecs: ['पावर (650W, 850W, 1000W)', '80 Plus Gold Efficiency', 'OCP / OVP Surge Protection'],
    funFact: {
      pahadi: 'जैसे बिना पानी घराट का पत्थर नहीं घूम सकता, वैसे ही बिना अच्छी PSU कंप्यूटर एक सेकंड भी सांस नहीं ले सकता!',
      hindi: 'जैसे जल प्रवाह के बिना घराट का पहिया नहीं घूम सकता, वैसे ही बिना संतुलित PSU के कंप्यूटर काम नहीं कर सकता!',
      english: 'Without a steady stream, the stone watermill halts; likewise, a quality PSU ensures no motherboard component ever suffers voltage spikes!',
    },
    category: 'power',
    slotType: 'Chassis Power Supply Bay',
  },
];

export const GLOSSARY_ITEMS: GlossaryItem[] = [
  {
    id: 'ram',
    techTerm: 'RAM (Random Access Memory)',
    metaphorName: {
      pahadi: 'कामकाजी थाली / परात',
      hindi: 'कार्यकारी थाली',
      english: 'Active Kitchen Platter',
    },
    explanation: {
      pahadi: 'जितनी देर काम चल रहा है, सामान थाली में रहेगा। उठते ही थाली खाली!',
      hindi: 'जितनी देर काम हो रहा है, सामग्री थाली में रहेगी। कार्य समाप्त होते ही थाली खाली!',
      english: 'As long as cooking is in progress, dough stays on the platter. When the fire stops, the plate is cleared!',
    },
    technicalDef: {
      pahadi: 'अस्थायी कार्यशील मेमोरी जो वर्तमान काम को तेज गति से संभालती है।',
      hindi: 'अस्थायी कार्यशील मेमोरी जो वर्तमान काम को तेज गति से संभालती है।',
      english: 'Volatile high-speed memory holding data currently processed by CPU.',
    },
    realWorldExample: {
      pahadi: 'किताब खोलकर मेज पर रखना = RAM, किताब को अलमारी में बंद करना = Hard Disk',
      hindi: 'किताब खोलकर मेज पर रखना = RAM, किताब को अलमारी में बंद करना = Hard Disk',
      english: 'Book opened on reading desk = RAM; Book stored in wooden cupboard = Hard Drive',
    },
    category: 'hardware',
  },
  {
    id: 'rom',
    techTerm: 'ROM (Read Only Memory)',
    metaphorName: {
      pahadi: 'पत्थर की लकीर / प्राचीन ताम्रपत्र',
      hindi: 'शिलालेख / ताम्रपत्र',
      english: 'Stone Inscription / Copper Plate',
    },
    explanation: {
      pahadi: 'जो एक बार लिख दिया, उसे कोई बदल नहीं सकता। कंप्यूटर को चालू होने का रास्ता यही दिखाता है।',
      hindi: 'जो एक बार अंकित हो गया, वह कभी नहीं बदलता। कंप्यूटर के प्रारंभ होने के बुनियादी निर्देश यहीं हैं।',
      english: 'Permanently engraved instructions that cannot be modified. It holds the fundamental boot firmware (BIOS).',
    },
    technicalDef: {
      pahadi: 'स्थायी मेमोरी जिसमें बुनियादी बूट निर्देश (BIOS) दर्ज होते हैं।',
      hindi: 'स्थायी मेमोरी जिसमें कंप्यूटर के स्टार्ट होने के बुनियादी निर्देश (BIOS) होते हैं।',
      english: 'Non-volatile read-only memory containing startup firmware and BIOS code.',
    },
    realWorldExample: {
      pahadi: 'मंदिर की शिला पर खुदा हुआ मंत्र जिसे बदला नहीं जा सकता।',
      hindi: 'मंदिर की शिला पर खुदा हुआ मंत्र जिसे बदला नहीं जा सकता।',
      english: 'An ancient prayer carved into stone that never fades or alters.',
    },
    category: 'hardware',
  },
  {
    id: 'cache',
    techTerm: 'Cache Memory (कैश मेमोरी)',
    metaphorName: {
      pahadi: 'कुर्ते की आगे वाली जेब',
      hindi: 'कुर्ते की आगे वाली जेब',
      english: 'Front Vest Pocket',
    },
    explanation: {
      pahadi: 'माचिस या बीड़ी तुरंत जेब में होती है, संदूक में ढूंढने नहीं जाना पड़ता! सबसे तेज़ मेमोरी।',
      hindi: 'माचिस तुरंत जेब में होती है, संदूक में ढूंढने नहीं जाना पड़ता! सबसे तेज़ मेमोरी।',
      english: 'The matchbox kept in your front pocket—grabbed in a split second without opening the large cupboard!',
    },
    technicalDef: {
      pahadi: 'सीपीयू के सबसे पास मौजूद अत्यंत तेज मेमोरी।',
      hindi: 'सीपीयू के सबसे पास मौजूद अत्यंत तेज मेमोरी जो बार-बार इस्तेमाल होने वाले डेटा को रखती है।',
      english: 'Extremely fast SRAM built directly into the CPU die to store repetitive instructions.',
    },
    realWorldExample: {
      pahadi: 'जेब में रखा रुमाल बनाम अलमारी में बंद चादर।',
      hindi: 'जेब में रखा रुमाल बनाम अलमारी में बंद चादर।',
      english: 'A handkerchief in your pocket versus blankets folded deep in the wardrobe.',
    },
    category: 'hardware',
  },
  {
    id: 'software',
    techTerm: 'Software (सॉफ्टवेयर)',
    metaphorName: {
      pahadi: 'चाय की खुशबू और स्वाद',
      hindi: 'चाय की खुशबू और स्वाद',
      english: 'Aroma & Recipe of Tea',
    },
    explanation: {
      pahadi: 'चाय की महक और स्वाद को हाथ से पकड़ नहीं सकते, पर असली मज़ा उसी का है। बिना इसके केतली बेजान है!',
      hindi: 'चाय की सुगंध और स्वाद को हाथ से छुआ नहीं जा सकता, पर असली आनंद उसी का है। बिना इसके केतली निष्प्राण है!',
      english: 'You cannot touch the aroma or taste of spiced tea with bare hands, but that is the soul of the drink!',
    },
    technicalDef: {
      pahadi: 'अदृश्य प्रोग्राम और निर्देश जो हार्डवेयर को चलाते हैं।',
      hindi: 'कंप्यूटर के वे सभी प्रोग्राम और निर्देश जिन्हें छुआ नहीं जा सकता, पर वे ही कंप्यूटर को संचालित करते हैं।',
      english: 'Intangible code, applications, and operating system instructions orchestrating physical hardware.',
    },
    realWorldExample: {
      pahadi: 'शरीर हार्डवेयर है और उसमें दौड़ती चेतना/विचार सॉफ्टवेयर हैं।',
      hindi: 'शरीर हार्डवेयर है और उसमें विचार सॉफ्टवेयर हैं।',
      english: 'The human physical body is hardware; conscious thought and ideas are software.',
    },
    category: 'software',
  },
  {
    id: 'hardware',
    techTerm: 'Hardware (हार्डवेयर)',
    metaphorName: {
      pahadi: 'तांबे की केतली, चिमटा और तवा',
      hindi: 'तांबे की केतली, चिमटा और तवा',
      english: 'Brass Kettle, Tongs & Iron Pan',
    },
    explanation: {
      pahadi: 'जो चीज़ हाथ में आ जाए, भारी लगे और जिस पर डंडा मारो तो खनक की आवाज़ आए!',
      hindi: 'जो वस्तु हाथ में आ जाए, ठोस हो और जिसे स्पर्श किया जा सके!',
      english: 'Tangible physical items you can hold in your hands, place on the table, and physically inspect.',
    },
    technicalDef: {
      pahadi: 'कंप्यूटर के भौतिक पुर्जे जिन्हें छुआ जा सकता है।',
      hindi: 'कंप्यूटर के वे सभी भौतिक उपकरण जिन्हें हाथों से छुआ और देखा जा सकता है।',
      english: 'Physical electronic and mechanical machinery comprising the computer system.',
    },
    realWorldExample: {
      pahadi: 'कीबोर्ड, माउस, मॉनिटर, सीपीयू का डिब्बा।',
      hindi: 'कीबोर्ड, माउस, मॉनिटर, सीपीयू का कैबिनेट।',
      english: 'Keyboard, mouse, visual display, electronic chassis.',
    },
    category: 'hardware',
  },
  {
    id: 'bug',
    techTerm: 'Bug (सॉफ्टवेयर बग)',
    metaphorName: {
      pahadi: 'दाल में कंकड़ या फसल में कीड़ा',
      hindi: 'दाल में कंकड़ या फसल में कीड़ा',
      english: 'Pebble in Lentils / Crop Pests',
    },
    explanation: {
      pahadi: 'खाते समय अचानक दांत के नीचे कंकड़ आ जाना! प्रोग्राम में आई कोई भी गड़बड़ी बग कहलाती है।',
      hindi: 'भोजन करते समय दांत के नीचे कंकड़ आ जाना! सॉफ्टवेयर में उत्पन्न त्रुटि को बग कहते हैं।',
      english: 'Biting unexpectedly on a small pebble while chewing dinner! An unforeseen error or glitch in computer logic.',
    },
    technicalDef: {
      pahadi: 'सॉफ्टवेयर कोड में हुई कोई अप्रत्याशित भूल।',
      hindi: 'सॉफ्टवेयर कोड में हुई कोई त्रुटि जिसकी वजह से प्रोग्राम गलत व्यवहार करता है।',
      english: 'An anomaly or defect in computer source code producing unexpected outcomes.',
    },
    realWorldExample: {
      pahadi: 'कैलकुलेटर में 2 + 2 का जवाब 5 आ जाना।',
      hindi: 'कैलकुलेटर में 2 + 2 का परिणाम 5 आ जाना।',
      english: 'A calculator app incorrectly displaying 2 + 2 = 5.',
    },
    category: 'software',
  },
  {
    id: 'cloud',
    techTerm: 'Cloud Storage (क्लाउड स्टोरेज)',
    metaphorName: {
      pahadi: 'आसमान का कोठार / दूर रिश्तेदार का संदूक',
      hindi: 'आसमान का कोठार / सुदूर भंडार',
      english: 'Sky Granary / Remote Vault',
    },
    explanation: {
      pahadi: 'सामान तुम्हारे अपने घर में नहीं, पर जब भी चाबी (इंटरनेट) लगाओगे, कहीं से भी मिल जाएगा!',
      hindi: 'सामान आपके अपने घर में नहीं, पर जब भी इंटरनेट की चाबी लगाएंगे, संसार के किसी भी कोने से प्राप्त हो जाएगा!',
      english: 'Your belongings are not stored inside your house, but whenever you use your internet key, you can retrieve them anywhere!',
    },
    technicalDef: {
      pahadi: 'इंटरनेट पर मौजूद विशाल सुरक्षित रिमोट सर्वर।',
      hindi: 'इंटरनेट पर स्थित विशाल सुरक्षित सर्वर जहां आप अपनी फाइलें ऑनलाइन रख सकते हैं।',
      english: 'Offsite data hosting distributed across secure remote server networks reachable via the internet.',
    },
    realWorldExample: {
      pahadi: 'Google Drive, OneDrive या Apple iCloud।',
      hindi: 'Google Drive, OneDrive या Apple iCloud।',
      english: 'Google Drive, iCloud, or Microsoft OneDrive.',
    },
    category: 'internet',
  },
  {
    id: 'firewall',
    techTerm: 'Firewall (फायरवॉल)',
    metaphorName: {
      pahadi: 'खेतों के चारों तरफ पत्थरों की ऊंची बाड़',
      hindi: 'खेतों के चारों ओर पत्थरों की बाड़',
      english: 'Dry-Stone Field Wall (Khet Ki Baad)',
    },
    explanation: {
      pahadi: 'जंगली सुअर और बंदरों को खेत में घुसने से रोकने वाली मजबूत दीवार! कंप्यूटर को वायरस से बचाती है।',
      hindi: 'जंगली जानवरों को खेत में प्रवेश से रोकने वाली मजबूत दीवार! यह कंप्यूटर को अनधिकृत घुसपैठ से बचाती है।',
      english: 'The towering dry-stone wall protecting terraced mountain crops from wild boars—shielding computers from malicious intruders!',
    },
    technicalDef: {
      pahadi: 'नेटवर्क ट्रैफिक पर नजर रखने वाली सुरक्षा प्रणाली।',
      hindi: 'एक सुरक्षा प्रणाली जो नेटवर्क में आने-जाने वाले ट्रैफिक की जांच कर अवांछित तत्वों को रोकती है।',
      english: 'A network security system monitoring and filtering incoming and outgoing traffic based on predetermined rules.',
    },
    realWorldExample: {
      pahadi: 'गाँव की सीमा पर तैनात पहरेदार जो केवल अपनों को अंदर आने दे।',
      hindi: 'गाँव का पहरेदार जो केवल परिचितों को अंदर आने दे।',
      english: 'A village watchman allowing only recognized residents through the gates.',
    },
    category: 'internet',
  },
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 'q1',
    question: {
      pahadi: 'बल दगड़ियों! कंप्यूटर की वह कौन सी मेमोरी छ, जो रसोई की थाली जैसी हुंद—काम होते ही खाली और बिजली जाते ही सब गायब?',
      hindi: 'कंप्यूटर की वह कौन सी मेमोरी है जो रसोई की थाली जैसी होती है—बिजली जाते ही जिसका सारा डेटा मिट जाता है?',
      english: 'Which computer memory behaves like an active kitchen rolling platter—cleared instantly the moment electricity is disconnected?',
    },
    options: [
      {
        id: 'a',
        text: {
          pahadi: 'हार्ड डिस्क (Hard Disk / SSD)',
          hindi: 'हार्ड डिस्क / SSD',
          english: 'Hard Disk / SSD',
        },
        isCorrect: false,
      },
      {
        id: 'b',
        text: {
          pahadi: 'रैम (RAM - Random Access Memory)',
          hindi: 'रैम (RAM)',
          english: 'RAM (Random Access Memory)',
        },
        isCorrect: true,
      },
      {
        id: 'c',
        text: {
          pahadi: 'मॉनिटर की स्क्रीन',
          hindi: 'मॉनिटर स्क्रीन',
          english: 'Monitor Screen',
        },
        isCorrect: false,
      },
      {
        id: 'd',
        text: {
          pahadi: 'माउस की पूंछ',
          hindi: 'माउस केबल',
          english: 'Mouse Cable',
        },
        isCorrect: false,
      },
    ],
    explanation: {
      pahadi: 'बिल्कुल सही दगड्या! RAM एक अस्थायी (Volatile) थाली है। जब तक कंप्यूटर ऑन है तब तक डाटा रहता है, बंद होते ही थाली साफ!',
      hindi: 'शाबाश! रैम एक वोलेटाइल मेमोरी है जो कंप्यूटर चालू रहने तक ही डेटा को तात्कालिक उपयोग के लिए संभालती है।',
      english: 'Correct! RAM is volatile memory that serves as the rapid workspace while powered, wiping cleanly when power cuts.',
    },
  },
  {
    id: 'q2',
    question: {
      pahadi: 'चाय-मंडुवे की रसोई में अगर चायपत्ती, अदरक और आटा "इनपुट" छ, तो तैयार गरमा-गरम चाय और रोटी क्या छ?',
      hindi: 'यदि चायपत्ती, अदरक और मंडुवे का आटा "इनपुट" हैं, तो तैयार कड़क चाय और थाली में परोसी रोटी क्या कहलाएगी?',
      english: 'If crushed ginger, tea leaves, and millet flour represent "Input", what does the steaming served tea and roti represent?',
    },
    options: [
      {
        id: 'a',
        text: {
          pahadi: 'आउटपुट (Output)',
          hindi: 'आउटपुट (Output)',
          english: 'Output',
        },
        isCorrect: true,
      },
      {
        id: 'b',
        text: {
          pahadi: 'सॉफ्टवेयर बग (Bug)',
          hindi: 'सॉफ्टवेयर बग',
          english: 'Software Bug',
        },
        isCorrect: false,
      },
      {
        id: 'c',
        text: {
          pahadi: 'मदरबोर्ड का नट-बोल्ट',
          hindi: 'मदरबोर्ड स्क्रू',
          english: 'Motherboard Screws',
        },
        isCorrect: false,
      },
      {
        id: 'd',
        text: {
          pahadi: 'एंटीवायरस',
          hindi: 'एंटीवायरस',
          english: 'Antivirus',
        },
        isCorrect: false,
      },
    ],
    explanation: {
      pahadi: 'शाबाश दगड्या! तैयार चाय और रोटी ही मेहनत का अंतिम परिणाम यानी "आउटपुट" है, जैसे मॉनिटर पर दिखती स्क्रीन!',
      hindi: 'एकदम सही! इनपुट और प्रोसेसिंग के बाद जो अंतिम परिणाम प्राप्त होता है, उसे आउटपुट कहा जाता है।',
      english: 'Splendid! The finished fragrant tea and cooked bread embody Output—the ultimate tangible result displayed or served!',
    },
  },
  {
    id: 'q3',
    question: {
      pahadi: 'गाँव का मुखिया जी जो सब फैसले करद और चूल्हे की आग जो सब कुछ पकांद—कंप्यूटर में ईं काम कौन करद?',
      hindi: 'गाँव के मुखिया जी की तरह जो सभी फैसले और हिसाब-किताब करता है, कंप्यूटर में वह मुख्य अंग कौन सा है?',
      english: 'Like the village elder directing decisions and the hearth fire cooking everything, which component executes computing decisions?',
    },
    options: [
      {
        id: 'a',
        text: {
          pahadi: 'स्पीकर (गाणे बाजाण वाला)',
          hindi: 'स्पीकर',
          english: 'Audio Speakers',
        },
        isCorrect: false,
      },
      {
        id: 'b',
        text: {
          pahadi: 'CPU (सेंट्रल प्रोसेसिंग यूनिट)',
          hindi: 'CPU (सेंट्रल प्रोसेसिंग यूनिट)',
          english: 'CPU (Central Processing Unit)',
        },
        isCorrect: true,
      },
      {
        id: 'c',
        text: {
          pahadi: 'कीबोर्ड का स्पेस बार',
          hindi: 'कीबोर्ड स्पेस बार',
          english: 'Keyboard Spacebar',
        },
        isCorrect: false,
      },
      {
        id: 'd',
        text: {
          pahadi: 'प्रिंटर की स्याही',
          hindi: 'प्रिंटर स्याही',
          english: 'Printer Ink Cartridge',
        },
        isCorrect: false,
      },
    ],
    explanation: {
      pahadi: 'बल जीत ग्या! CPU ही कंप्यूटर का असली मुखिया और दिमाग है, जो गणित और लॉजिक के सारे फैसले लेता है।',
      hindi: 'शानदार! CPU ही कंप्यूटर का मस्तिष्क है जो हर निर्देश और गणना को क्रियान्वित करता है।',
      english: 'Bravo! The CPU is the core director executing arithmetic and logic in billions of micro-instructions.',
    },
  },
  {
    id: 'q4',
    question: {
      pahadi: 'सालों-साल पुरानी फोटो, गाने और जरूरी कागजात सुरक्षित रखने खातिर कंप्यूटर का "कोठार" (Permanent Store) कौन सा छ?',
      hindi: 'कंप्यूटर बंद होने के बाद भी सालों-साल फाइलों और गानों को सुरक्षित रखने वाला "कोठार" कौन सा घटक है?',
      english: 'Which component functions as the durable mountain granary (Kothaar), keeping photos and files safe for years without power?',
    },
    options: [
      {
        id: 'a',
        text: {
          pahadi: 'SSD / हार्ड डिस्क (Storage Drive)',
          hindi: 'SSD / हार्ड डिस्क',
          english: 'SSD / Solid State Drive',
        },
        isCorrect: true,
      },
      {
        id: 'b',
        text: {
          pahadi: 'माउस पैड',
          hindi: 'माउस पैड',
          english: 'Mouse Pad',
        },
        isCorrect: false,
      },
      {
        id: 'c',
        text: {
          pahadi: 'कूलिंग फैन की हवा',
          hindi: 'कूलिंग फैन',
          english: 'Cooling Fan Air',
        },
        isCorrect: false,
      },
      {
        id: 'd',
        text: {
          pahadi: 'पावर केबल का प्लग',
          hindi: 'पावर प्लग',
          english: 'Power Plug Cable',
        },
        isCorrect: false,
      },
    ],
    explanation: {
      pahadi: 'वाह दगड्या! SSD व हार्ड डिस्क ही पक्का कोठार है। चाहे बिजली 10 दिन न आए, इसमें रखी फाइलें कभी नहीं मिटतीं।',
      hindi: 'बिल्कुल सही! SSD या HDD नॉन-वोलेटाइल स्टोरेज है जिसमें डेटा हमेशा के लिए सुरक्षित रहता है।',
      english: 'Exactly! Solid State Drives provide permanent non-volatile flash storage holding files safely across years.',
    },
  },
  {
    id: 'q5',
    question: {
      pahadi: 'हार्डवेयर और सॉफ्टवेयर में क्या फर्क छ?',
      hindi: 'हार्डवेयर (Hardware) और सॉफ्टवेयर (Software) में क्या अंतर है?',
      english: 'What is the fundamental distinction between Hardware and Software?',
    },
    options: [
      {
        id: 'a',
        text: {
          pahadi: 'हार्डवेयर तांबे की केतली छ (छू सकते हैं), सॉफ्टवेयर चाय की खुशबू छ (महसूस होती है पर हाथ नी आंदी)',
          hindi: 'हार्डवेयर को छू सकते हैं, सॉफ्टवेयर सिर्फ देखा और इस्तेमाल किया जा सकता है',
          english: 'Hardware is the brass kettle you can touch; Software is the intangible tea aroma and recipe',
        },
        isCorrect: true,
      },
      {
        id: 'b',
        text: {
          pahadi: 'दोनों एक ही चीज़ हैं, बस नाम अलग हैं',
          hindi: 'दोनों एक ही हैं',
          english: 'Both are identical concepts with different labels',
        },
        isCorrect: false,
      },
      {
        id: 'c',
        text: {
          pahadi: 'हार्डवेयर केवल रात को चलता है',
          hindi: 'हार्डवेयर केवल रात को चलता है',
          english: 'Hardware only operates after sunset',
        },
        isCorrect: false,
      },
      {
        id: 'd',
        text: {
          pahadi: 'सॉफ्टवेयर को हथौड़े से तोड़ा जा सकता है',
          hindi: 'सॉफ्टवेयर को हथौड़े से तोड़ा जा सकता है',
          english: 'Software can be shattered with a physical hammer',
        },
        isCorrect: false,
      },
    ],
    explanation: {
      pahadi: 'अरे गजब! हार्डवेयर तांबे की केतली जैसा भौतिक है जिसे हाथ लगा सकते हैं, और सॉफ्टवेयर चाय की महक व रेसिपी जैसा अदृश्य नियम है।',
      hindi: 'उत्कृष्ट! हार्डवेयर भौतिक उपकरण हैं जबकि सॉफ्टवेयर उन उपकरणों को चलाने वाले अदृश्य प्रोग्राम और निर्देश हैं।',
      english: 'Outstanding! Hardware is the physical apparatus, while Software represents the intangible algorithms governing behavior.',
    },
  },
];

export const ASSEMBLY_PARTS_LIST: AssemblyPart[] = [
  {
    id: 'cpu',
    name: { pahadi: 'CPU Processor', hindi: 'CPU प्रोसेसर', english: 'CPU Processor' },
    metaphorName: { pahadi: 'मुखिया जी का दिमाग', hindi: 'मुखिया जी का मस्तिष्क', english: 'Village Elder Brain' },
    hint: { pahadi: 'मदरबोर्ड के सॉकेट में बिठाएं', hindi: 'मदरबोर्ड सॉकेट में स्थापित करें', english: 'Seat into the central CPU socket' },
    iconName: 'Cpu',
  },
  {
    id: 'ram',
    name: { pahadi: 'RAM Stick (16GB)', hindi: 'RAM स्टिक (16GB)', english: 'RAM Module (16GB DDR5)' },
    metaphorName: { pahadi: 'कार्यकारी थाली', hindi: 'कार्यकारी थाली', english: 'Active Countertop' },
    hint: { pahadi: 'DIMM स्लॉट में टिक से बैठाएं', hindi: 'DIMM स्लॉट में क्लिक करें', english: 'Snap firmly into DIMM memory channel' },
    iconName: 'Layers',
  },
  {
    id: 'ssd',
    name: { pahadi: 'NVMe M.2 SSD', hindi: 'NVMe M.2 SSD', english: 'NVMe M.2 SSD (1TB)' },
    metaphorName: { pahadi: 'अन्न कोठार', hindi: 'स्थायी कोठार', english: 'Harvest Granary' },
    hint: { pahadi: 'M.2 खांचे में पेंच से कसें', hindi: 'M.2 खांचे में पेंच लगाएं', english: 'Fasten into the M.2 NVMe lane with screw' },
    iconName: 'HardDrive',
  },
  {
    id: 'gpu',
    name: { pahadi: 'Dedicated GPU', hindi: 'ग्राफिक्स कार्ड (GPU)', english: 'Dedicated Graphics GPU' },
    metaphorName: { pahadi: 'लोक-चित्रकार', hindi: 'ऐपण चित्रकार', english: 'Folk Aipan Muralist' },
    hint: { pahadi: 'PCIe x16 स्लॉट में लगाएं', hindi: 'PCIe x16 स्लॉट में लगाएं', english: 'Lock into high-bandwidth PCIe x16 slot' },
    iconName: 'Image',
  },
  {
    id: 'psu',
    name: { pahadi: 'Power Supply (PSU)', hindi: 'पावर सप्लाई (PSU)', english: 'Power Supply (850W Gold)' },
    metaphorName: { pahadi: 'घराट की ऊर्जा', hindi: 'घराट की ऊर्जा', english: 'Watermill Hydro Power' },
    hint: { pahadi: 'मदरबोर्ड को 24-पिन पावर दें', hindi: 'मदरबोर्ड को 24-पिन विद्युत जोड़ें', english: 'Connect 24-pin main motherboard cable' },
    iconName: 'Zap',
  },
];

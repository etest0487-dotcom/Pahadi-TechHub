import { PahadiBadge } from '../types';

export const PAHADI_BADGES: PahadiBadge[] = [
  {
    id: 'pipeline_master',
    title: {
      pahadi: 'चाय-मंडुवा उस्ताद (Master of Pipeline)',
      hindi: 'चाय-मंडुवा उस्ताद (पाइपलाइन मास्टर)',
      english: 'Master of Pipeline (Culinary Architecture)',
    },
    metaphor: {
      pahadi: 'कड़क अदरक चाय और मंडुवे की रोटी का पक्का रसोइया',
      hindi: 'कच्ची सामग्री से लेकर थाली में परोसने का संपूर्ण शिल्पी',
      english: 'Master of raw inputs, active kneading, and warm output',
    },
    description: {
      pahadi: 'चाय-मंडुवा पाइपलाइन सिमुलेटर के सभी चरणों को समझकर अंतिम आउटपुट तैयार किया।',
      hindi: 'इनपुट से लेकर आउटपुट तक की पूरी कंप्यूटर पाइपलाइन को सफलतापूर्वक समझा।',
      english: 'Successfully orchestrated the 5-stage data lifecycle from peripheral input to served output.',
    },
    praisePahadi: {
      pahadi: 'बल वाह दगड्या! चूल्हे की आंच से लेकर थाली तक सब समझ गया!',
      hindi: 'शाबाश! आपने इनपुट-प्रोसेस-आउटपुट का रहस्य सुलझा लिया है!',
      english: 'Bravo! You mastered the fundamental Input-Process-Storage-Output pipeline!',
    },
    category: 'pipeline',
    icon: 'Coffee',
    moduleRequirement: {
      pahadi: 'चाय-मंडुवा सिमुलेटर में आउटपुट तक पहुँचें',
      hindi: 'चाय-मंडुवा सिमुलेटर पूरा करें',
      english: 'Complete the Chai-Manduwa Pipeline Simulator',
    },
    accentColor: '#f59e0b',
  },
  {
    id: 'hardware_legend',
    title: {
      pahadi: 'अंग-प्रत्यंग ज्ञानी (Hardware Legend)',
      hindi: 'अंग-प्रत्यंग ज्ञानी (हार्डवेयर लीजेंड)',
      english: 'Hardware Legend (Circuit & Hearth Sage)',
    },
    metaphor: {
      pahadi: 'मुखिया जी के दिमाग और अनाज के कोठार का पारखी',
      hindi: 'मदरबोर्ड के आंगन से लेकर घराट की ऊर्जा तक का ज्ञाता',
      english: 'Connoisseur of silicon brains, granaries, and courtyards',
    },
    description: {
      pahadi: 'कंप्यूटर के सभी आंतरिक अंगों (CPU, RAM, Motherboard, SSD, GPU, PSU) का गहरा अध्ययन किया।',
      hindi: 'कंप्यूटर के समस्त प्रमुख आंतरिक घटकों और उनकी विशिष्टताओं का विस्तृत अवलोकन किया।',
      english: 'Inspected and mastered the anatomical roles and specs of all core internal PC hardware components.',
    },
    praisePahadi: {
      pahadi: 'शाबाश दगड्या! अब तुमन कोई नी ठग सकद बाजार मा कंप्यूटर खरीदते हुए!',
      hindi: 'उत्कृष्ट! अब आप कंप्यूटर के हर आंतरिक पुर्जे की भाषा समझते हैं!',
      english: 'Splendid! You now speak the true language of modular computer hardware!',
    },
    category: 'hardware',
    icon: 'Cpu',
    moduleRequirement: {
      pahadi: 'अंग-प्रत्यंग अनुभाग में पुर्जों का अन्वेषण करें',
      hindi: 'हार्डवेयर घटकों का अध्ययन करें',
      english: 'Inspect parts in the Hardware Explorer',
    },
    accentColor: '#0ea5e9',
  },
  {
    id: 'binary_wizard',
    title: {
      pahadi: 'बाइनरी का जादूगर (Binary & ALU Alchemist)',
      hindi: 'बाइनरी का जादूगर (ALU विशेषज्ञ)',
      english: 'Binary & ALU Alchemist',
    },
    metaphor: {
      pahadi: '0 और 1 के संकेतों से पहाड़ हिलाने वाला सिद्धहस्त',
      hindi: 'अक्षरों को बाइनरी संकेतों में बदलकर गणना करने वाला जादूगर',
      english: 'Conjurer of high/low voltages and arithmetic logic gates',
    },
    description: {
      pahadi: 'डेटा फ्लो लैब में अक्षरों को 8-बिट बाइनरी में बदलकर सीपीयू के ALU से गणना कराई।',
      hindi: 'लाइव डेटा लैब में बाइनरी संकेतों का प्रवाह और सीपीयू की गणितीय क्षमताएं जांची।',
      english: 'Dispatched data packets through 8-bit binary registers and executed CPU clock cycles.',
    },
    praisePahadi: {
      pahadi: 'गजब दगड्या! बाइनरी का खेल तुमन चुटकियों मा समझ ल्यो!',
      hindi: 'अद्भुत! आपने देखा कि कंप्यूटर कैसे केवल 0 और 1 में पूरी दुनिया रचता है!',
      english: 'Brilliant! You witnessed how pure 0s and 1s materialize into human thought!',
    },
    category: 'dataflow',
    icon: 'Binary',
    moduleRequirement: {
      pahadi: 'डेटा फ्लो लैब में गणना या शब्द प्रोसेस करें',
      hindi: 'डेटा फ्लो लैब में प्रयोग चलाएं',
      english: 'Execute a data simulation in the Data Flow Lab',
    },
    accentColor: '#10b981',
  },
  {
    id: 'pc_builder',
    title: {
      pahadi: 'कंप्यूटर कारीगर (Silicon Artisan)',
      hindi: 'कंप्यूटर कारीगर (पीसी बिल्डर)',
      english: 'Silicon Artisan (PC Builder & Assembler)',
    },
    metaphor: {
      pahadi: 'मदरबोर्ड के आंगन में सभी अंगों को बिठाने वाला कुशल शिल्पकार',
      hindi: 'सभी 5 मुख्य पुर्जों को सटीक खांचों में कसने वाला इंजीनियर',
      english: 'Craftsman who locks silicon chips into motherboards and sparks life',
    },
    description: {
      pahadi: 'असेंबली अखाड़े में CPU, RAM, SSD, GPU और PSU को सही सॉकेट में बैठाकर कंप्यूटर को पावर ऑन किया।',
      hindi: 'स्वयं कंप्यूटर के सभी कलपुर्जे जोड़कर पहली बार सफलता से बूट किया।',
      english: 'Seated CPU, RAM, NVMe SSD, GPU, and PSU into motherboard slots and achieved clean POST boot.',
    },
    praisePahadi: {
      pahadi: 'बल दगड्या! कंप्यूटर चालू ह्वे गे! पंखा घूम ग्या, अब बनो डिजिटल इंजीनियर!',
      hindi: 'बधाई! आपने अपना पहला कंप्यूटर सफलतापूर्वक असेंबल और बूट कर लिया!',
      english: 'Bravo! Chassis fans spinning and POST tests passed—you built a working computer!',
    },
    category: 'assembly',
    icon: 'Wrench',
    moduleRequirement: {
      pahadi: 'असेंबली अखाड़े में सभी पुर्जे जोड़कर पावर बटन दबाएं',
      hindi: 'असेंबली वर्कशॉप में कंप्यूटर चालू करें',
      english: 'Assemble all 5 parts and boot the PC in the Assembly Workshop',
    },
    accentColor: '#eab308',
  },
  {
    id: 'dictionary_scholar',
    title: {
      pahadi: 'शब्दकोश पारखी (Tech Vocabulary Scholar)',
      hindi: 'शब्दकोश पारखी (शब्दावली विद्वान)',
      english: 'Tech Vocabulary Scholar (Mountain Linguist)',
    },
    metaphor: {
      pahadi: 'आसमान के कोठार (Cloud) और जेब के बटुए (Cache) का मर्म जानने वाला',
      hindi: 'तकनीकी शब्दों को लोक-जीवन की उपमाओं में ढालने वाला व्याख्याता',
      english: 'Interpreter of sky granaries (Cloud) and pocket purses (Cache)',
    },
    description: {
      pahadi: 'पहाड़ी टेक शब्दकोश में कठिन तकनीकी शब्दों की लोक-उपमाओं और उच्चारण का अध्ययन किया।',
      hindi: 'कंप्यूटर शब्दावली में कठिन शब्दों की व्यावहारिक उपमाओं को समझा।',
      english: 'Mastered colloquial Himalayan metaphors for modern technical abstractions like Cloud, Bug, and Cache.',
    },
    praisePahadi: {
      pahadi: 'वाह रे दगड्या! अब कठिन से कठिन अंग्रेजी शब्द भी तुम्हारी मुट्ठी में छ!',
      hindi: 'शानदार! कठिन शब्दावली अब आपके लिए सहज और परिचित हो चुकी है!',
      english: 'Phenomenal! Complex technological terminology is now natural second nature!',
    },
    category: 'dictionary',
    icon: 'BookOpen',
    moduleRequirement: {
      pahadi: 'शब्दकोश में शब्दों को खोजें या उच्चारण सुनें',
      hindi: 'शब्दकोश का अन्वेषण करें',
      english: 'Search or listen to terms in the Pahadi Tech Glossary',
    },
    accentColor: '#8b5cf6',
  },
  {
    id: 'quiz_champion',
    title: {
      pahadi: 'पहाड़ी कंप्यूटर सिरमौर (Himalayan Tech Champion)',
      hindi: 'पहाड़ी कंप्यूटर सिरमौर (क्विज़ चैंपियन)',
      english: 'Himalayan Tech Champion (Pathshala Graduate)',
    },
    metaphor: {
      pahadi: 'पहाड़ की चोटी पर बैठकर ज्ञान का शंख बजाने वाला श्रेष्ठ विद्वान',
      hindi: 'चाय-मंडुवे की पाठशाला का शीर्ष स्नातक और मेधावी छात्र',
      english: 'Crown graduate who commands all computer foundations from the mountain summit',
    },
    description: {
      pahadi: 'दगड़िया क्विज़ के सभी कठिन सवालों का सामना करके प्रमाण-पत्र हासिल किया।',
      hindi: 'कंप्यूटर ज्ञान क्विज़ को सफलतापूर्वक उत्तीर्ण कर संपूर्णता प्रमाण-पत्र प्राप्त किया।',
      english: 'Successfully tackled the comprehensive conceptual quiz and unlocked the completion certificate.',
    },
    praisePahadi: {
      pahadi: 'जय बद्री विशाल! दगड्या, तू त सचमुच कंप्यूटर का सिरमौर बन ग्या!',
      hindi: 'अद्भुत सफलता! आपने पाठशाला के सभी सिद्धांतों पर विजय प्राप्त कर ली है!',
      english: 'Victory! You have conquered the Himalayan Computer Pathshala with flying colors!',
    },
    category: 'quiz',
    icon: 'Award',
    moduleRequirement: {
      pahadi: 'दगड़िया क्विज़ सफलतापूर्वक संपन्न करें',
      hindi: 'कंप्यूटर क्विज़ पूरा करें',
      english: 'Complete the Dagadya Knowledge Quiz',
    },
    accentColor: '#ec4899',
  },
];

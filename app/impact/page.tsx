"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  GraduationCap, 
  HeartHandshake, 
  Leaf, 
  MapPin, 
  Calendar, 
  UserCheck, 
  Building,
  Activity,
  Award,
  Users,
  CheckCircle2,
  Quote
} from "lucide-react";
import Counter from "../components/Counter";
import { Card, MotionCard } from "../components/Card";

export default function Impact() {
  const [activeTab, setActiveTab] = useState<"education" | "healthcare" | "environment" | "relief">("education");

  const statCards = [
    { label: "Students Sponsored", count: 34, suffix: "", desc: "Across 7 states in India, with 65% girl students.", icon: <GraduationCap className="w-5 h-5 text-foreground" />, color: "" },
    { label: "Healthcare Beneficiaries", count: 397, suffix: "+", desc: "Diagnostics and cancer screenings in rural villages.", icon: <HeartHandshake className="w-5 h-5 text-foreground" />, color: "" },
    { label: "Mangrove Saplings", count: 4000, suffix: "+", desc: "Saplings planted & fenced in coastal Sundarbans.", icon: <Leaf className="w-5 h-5 text-foreground" />, color: "" },
    { label: "Relief Material Delivered", count: 480, suffix: "+", desc: "Families served with heavy winter protection blankets.", icon: <Activity className="w-5 h-5 text-foreground" />, color: "" }
  ];

  return (
    <div className="flex flex-col w-full">
      {/* Intro Hero */}
      <section className="relative py-24 px-6 md:px-12 flex items-center justify-center overflow-hidden border-b border-foreground/5 min-h-[90vh]">
        {/* Full-size Hero Background */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://live4help.org/wp-content/uploads/2023/07/Medical-Camp-Photo.jpg"
            alt="Impact Metrics Hero"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/20" />
        </div>

        {/* Floating Glassmorphism Hero Content Card */}
        <div className="max-w-4xl mx-auto w-full z-10 relative">
          <div className="w-full text-center flex flex-col items-center gap-6">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs uppercase tracking-widest  shadow-soft font-semibold bg-[#DCCFF8] text-[#444444]"
            >
              <Award className="w-3.5 h-3.5 text-[#444444]" />
              Transparency & Results
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="font-display font-bold text-3xl sm:text-5xl md:text-6xl text-white tracking-tight leading-none"
            >
              Measuring Our Impact
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-black/40 backdrop-blur-md px-6 py-4 rounded-2xl border border-white/10 text-sm sm:text-base md:text-lg text-white/75 leading-relaxed font-sans max-w-2xl"
            >
              We translate every donation and resource directly into local, verified actions. Explore our core statistics, distributions, and field reports.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Grid Dashboard */}
      <section className="py-8 px-6 md:px-12 bg-white pb-16">
        <div className="bg-[#FFE6D4] rounded-[3rem] py-8 px-4 md:py-16 md:px-8 border border-foreground/5 max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {statCards.map((card, i) => (
            <MotionCard
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              key={card.label}
              className="p-8 rounded-[2.5rem] border border-[#EEB898] flex flex-col gap-6 shadow-soft"
            >
              <div className={`w-12 h-12 rounded-xl ${card.color} flex items-center justify-center`}>
                {card.icon}
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-sm font-semibold text-foreground/60">{card.label}</span>
                <span className="text-4xl md:text-5xl font-display font-bold text-foreground tracking-tight">
                  <Counter end={card.count} suffix={card.suffix} />
                </span>
                <p className="text-xs text-foreground/60 leading-relaxed mt-2">{card.desc}</p>
              </div>
            </MotionCard>
          ))}
        </div>
      </section>

      {/* Interactive Tabs Section */}
      <section className="py-8 px-6 md:px-12 bg-white pb-16">
        <div className="bg-[#E5F0E5] rounded-[3rem] py-8 px-4 md:py-16 md:px-8 border border-foreground/5 max-w-7xl mx-auto flex flex-col gap-12">
          {/* Tab Selector */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-4 border-b border-foreground/5 p-1 max-w-3xl mx-auto w-full">
            {(["education", "healthcare", "environment", "relief"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 sm:px-6 py-3 text-xs sm:text-sm font-semibold uppercase tracking-wider rounded-2xl transition-premium cursor-pointer ${
                  activeTab === tab 
                    ? "bg-[#CFE8FF] text-foreground shadow-soft border border-foreground/5" 
                    : "text-foreground/65 hover:text-foreground"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Tab Contents */}
          <div className="mt-4">
            {activeTab === "education" && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col gap-8 w-full"
              >
                {/* Overview */}
                <div className="flex flex-col gap-4">
                  <h3 className="font-display font-bold text-3xl text-foreground">Ngo for Poor Child Education Underprivileged Children in Delhi/NCR</h3>
                  <p className="text-sm text-foreground/80 leading-relaxed">
                    Live 4 Help (L4H) Foundation is committed to identify deserving students and their academic needs. L4H Foundation through social platforms appeals to donors to help these needy students with stipends / scholarships to meet their basic needs and continuity of education.
                  </p>
                  <p className="text-sm text-foreground/80 leading-relaxed">
                    From a humble journey with one student in June’21, L4H Foundation has extended education support to a total of 34 students from seven states of India (Delhi, West Bengal, Orissa, Uttarakhand, Uttar Pradesh, Jharkhand and Bihar). Majority (22 out of 34/65%) students are girls. With the help of local volunteers, L4H Foundation keeps tracks of the progress of their education.
                  </p>
                </div>

                {/* 3-Column Grid: Support Scope, Guidelines, and Sponsoring States */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card className="p-6 rounded-[2.5rem] border border-[#C1D6C1] shadow-soft flex flex-col gap-4 bg-white">
                    <div className="flex items-center gap-2">
                      <GraduationCap className="w-5 h-5 text-primary" />
                      <h4 className="font-bold text-sm text-foreground uppercase tracking-wider">Supports Provided</h4>
                    </div>
                    <p className="text-xs text-foreground/75 leading-relaxed mb-1">
                      L4H Foundation is providing following supports to the needy students:
                    </p>
                    <ul className="flex flex-col gap-2 text-xs text-foreground/75 list-disc pl-5 leading-relaxed">
                      <li>School, Semester and Tuition Fees</li>
                      <li>Books / Stationeries</li>
                      <li>Free Online / Offline coaching on need basis</li>
                      <li>Counselling</li>
                      <li>Transportation, Health check-up, medicines, as deemed essential</li>
                    </ul>
                  </Card>
                  <Card className="p-6 rounded-[2.5rem] border border-[#C1D6C1] shadow-soft flex flex-col gap-4 bg-white">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-[#DD6B20]" />
                      <h4 className="font-bold text-sm text-foreground uppercase tracking-wider">Guidelines / Criteria</h4>
                    </div>
                    <p className="text-xs text-foreground/75 leading-relaxed mb-1">
                      Students are identified based of following guidelines/criteria:
                    </p>
                    <ul className="flex flex-col gap-2 text-xs text-foreground/75 list-disc pl-5 leading-relaxed">
                      <li>Meritorious student, who needs financial assistance.</li>
                      <li>Preference to students with single parent or no parents</li>
                      <li>Preference to girl students</li>
                      <li>Preference to students below class IX</li>
                    </ul>
                  </Card>
                  <Card className="p-6 rounded-[2.5rem] border border-[#C1D6C1] shadow-soft flex flex-col gap-4 bg-white">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-secondary" />
                      <h4 className="font-bold text-sm text-foreground uppercase tracking-wider">Sponsoring States (7)</h4>
                    </div>
                    <p className="text-xs text-foreground/75 leading-relaxed mb-1">
                      Active regions where students are sponsored:
                    </p>
                    <ul className="flex flex-col gap-2 text-xs text-foreground/75 leading-relaxed">
                      <li className="flex justify-between border-b border-foreground/5 pb-1"><span>Delhi / NCR</span> <span className="font-semibold text-foreground text-[10px]">Urban Outreach</span></li>
                      <li className="flex justify-between border-b border-foreground/5 pb-1"><span>West Bengal</span> <span className="font-semibold text-foreground text-[10px]">Rural & Tribal</span></li>
                      <li className="flex justify-between border-b border-foreground/5 pb-1"><span>Bihar & Jharkhand</span> <span className="font-semibold text-foreground text-[10px]">Academic</span></li>
                      <li className="flex justify-between border-b border-foreground/5 pb-1"><span>Uttar Pradesh</span> <span className="font-semibold text-foreground text-[10px]">Tuition</span></li>
                      <li className="flex justify-between pb-0"><span>Uttarakhand & Odisha</span> <span className="font-semibold text-foreground text-[10px]">Secondary</span></li>
                    </ul>
                  </Card>
                </div>

                {/* A. Education Team */}
                <Card className="p-6 md:p-8 rounded-[2.5rem] border border-[#C1D6C1] shadow-soft bg-white flex flex-col gap-6">
                  <div className="flex items-center gap-3 border-b border-foreground/5 pb-4">
                    <Users className="w-6 h-6 text-secondary" />
                    <div>
                      <h4 className="font-display font-bold text-lg text-foreground">A. Education Team</h4>
                    </div>
                  </div>
                  <p className="text-xs text-foreground/75 leading-relaxed">
                    L4H Foundation has formed an education team comprising highly qualified persons. During regular monthly virtual meeting, team invites students to share their aspirations, career path, progress, needs etc. Such interaction provides an open forum for bonding with members of L4H Foundation/sponsors, increased their confidence, communication skills as well as assist Foundation to identify gaps and potential improvement opportunities.
                  </p>
                  
                  <div className="overflow-x-auto w-full rounded-2xl border border-[#C1D6C1] shadow-soft">
                    <table className="min-w-full text-xs text-left text-foreground/80 bg-white">
                      <thead className="bg-[#FFE6D4] text-foreground uppercase tracking-wider text-[10px] font-bold border-b border-[#EEB898]">
                        <tr>
                          <th className="px-6 py-4">Name</th>
                          <th className="px-6 py-4">Qualifications</th>
                          <th className="px-6 py-4">Profession</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#C1D6C1]/30">
                        <tr className="hover:bg-foreground/5 transition-colors">
                          <td className="px-6 py-4 font-bold text-foreground">Dr. Ramkrishna Sadhukhan</td>
                          <td className="px-6 py-4">PhD in Biochemistry, Post Doctorate from Cleveland Clinic and Pfizer</td>
                          <td className="px-6 py-4">Senior Principal Research Scientist, Head of Therapeutic Protein Engineering, Global Biologics, AbbVie, USA</td>
                        </tr>
                        <tr className="hover:bg-foreground/5 transition-colors">
                          <td className="px-6 py-4 font-bold text-foreground">Debashish Das</td>
                          <td className="px-6 py-4">Master’s in computer science</td>
                          <td className="px-6 py-4">Entrepreneur, Former Executive Director of IBM (GBS)</td>
                        </tr>
                        <tr className="hover:bg-foreground/5 transition-colors">
                          <td className="px-6 py-4 font-bold text-foreground">Bibekananda Maiti</td>
                          <td className="px-6 py-4">B.Tech, Chemical, PGDIE</td>
                          <td className="px-6 py-4">Supply Chain Director – APAC, Guardian Industries, Thailand</td>
                        </tr>
                        <tr className="hover:bg-foreground/5 transition-colors">
                          <td className="px-6 py-4 font-bold text-foreground">Subhabrata Chakraborti</td>
                          <td className="px-6 py-4">M.Sc. Economics</td>
                          <td className="px-6 py-4">Head of Business at Bharati Bhawan, Delhi, India, Formerly Director of Higher Education at Oxford University Press</td>
                        </tr>
                        <tr className="hover:bg-foreground/5 transition-colors">
                          <td className="px-6 py-4 font-bold text-foreground">Subhendu Shekhar Mal</td>
                          <td className="px-6 py-4">B. Tech, Chemical</td>
                          <td className="px-6 py-4">Operations Engineer, Kuwait National Petrochemical Company (KNPC), Kuwait</td>
                        </tr>
                        <tr className="hover:bg-foreground/5 transition-colors">
                          <td className="px-6 py-4 font-bold text-foreground">Tarun Kanti Maiti</td>
                          <td className="px-6 py-4">B. Tech, Chemical</td>
                          <td className="px-6 py-4">Project Engineering Manager, Bechtel, India</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </Card>

                {/* B. Achievement of Students in 2023 */}
                <Card className="p-6 md:p-8 rounded-[2.5rem] border border-[#C1D6C1] shadow-soft bg-white flex flex-col gap-4">
                  <h4 className="font-display font-bold text-lg text-foreground">B. Achievement of Students in 2023</h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-foreground/75 list-disc pl-5 leading-relaxed">
                    <li>1 student selected in IIT(M.Sc.)</li>
                    <li>3 students joined in Indian Post</li>
                    <li>1 student passed 12th with 90% +</li>
                    <li>2 students passed 12th with 80% +</li>
                    <li>1 student passed 12th with 70% +</li>
                    <li>1 student in 8th secured 92%</li>
                  </ul>
                </Card>

                {/* C. Face to face interaction with beneficiary students */}
                <Card className="p-6 md:p-8 rounded-[2.5rem] border border-[#C1D6C1] shadow-soft bg-white flex flex-col gap-5">
                  <h4 className="font-display font-bold text-lg text-foreground border-b border-foreground/5 pb-2">C. Face to face interaction with beneficiary students</h4>
                  <p className="text-xs sm:text-sm text-foreground/75 leading-relaxed">
                    Live 4 Help Foundation always endeavor to make a difference and believe that face to face interaction with the students is vital for our success towards education support program. With this thoughts, Live 4 Help Foundation Team met few students in Dec’23. One of core team members, Mr. Ramkrishna (Ramu) Sadhukhan who has come from USA to meet students and motivate them.
                  </p>
                  <p className="text-xs sm:text-sm text-foreground/75 leading-relaxed">
                    Our Beneficiary Student, Mr. Subham Pandey who is pursuing M.Sc. Physics from IIT, Chennai met with us on 26th Dec’23. We had a good discussion about his future carrier path. Mr. Subham like to pursue Ph. D after completion of master’s degree.
                  </p>
                  <p className="text-xs sm:text-sm text-foreground/75 leading-relaxed">
                    Live 4 Help Team met five Girl Students, Anjali Kisku, Sila Soren, Mukhi Moni, Rupali Hembram, Sonali Hembram and their parents in Tribal Village of Bankura District, West Bengal and observed ground reality of the living conditions of these students. It was really eye-opening and heart-breaking experience. We have given School Bags and Christmas Cake to the students. Live 4 Help Team reiterated and re-emphasized their parents to continue their education.
                  </p>
                  <p className="text-xs sm:text-sm text-foreground/75 leading-relaxed">
                    Live 4 Help Team strongly believe that such interaction will provide moral boost and motivation to them. L4H will continue to meet more students in future.
                  </p>
                  <div className="mt-2">
                    <p className="text-xs text-foreground/50 font-semibold mb-3">Here is few photographs capturing moments while interacting with students.</p>
                    <div className="aspect-[16/10] w-full rounded-[2rem] overflow-hidden border border-white shadow-soft relative">
                      <img referrerPolicy="no-referrer"
                        src="https://live4help.org/wp-content/uploads/2026/02/Students.png"
                        alt="Student Interaction photographs"
                        className="w-full h-full object-cover absolute inset-0"
                      />
                    </div>
                  </div>
                </Card>

                {/* D. Few Success Stories */}
                <div className="flex flex-col gap-6">
                  <h4 className="font-display font-bold text-2xl text-foreground">D. Few Success Stories</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card className="p-6 rounded-[2.5rem] border border-[#C1D6C1] shadow-soft bg-white flex flex-col gap-4 justify-between relative overflow-hidden group">
                      <div className="absolute top-6 right-6 w-10 h-10 rounded-full bg-[#CFE8FF] flex items-center justify-center shadow-soft z-20">
                        <Quote className="w-5 h-5 transform rotate-180 text-blue-900" />
                      </div>
                      <div className="flex flex-col gap-3 z-10">
                        <h5 className="font-display font-bold text-lg text-foreground">Suvankari Mondal</h5>
                        <p className="text-xs text-foreground/70 leading-relaxed">
                          Suvankari Mondal lost both her parents and is living with her aunty, a daily labourer. She was suffering from malnutrition and was unable to continue her education. L4H foundation initially helped her by providing medical support and nutritious foods to recover from health issues, expanded assistance in pursuing education. L4H Foundation is pleased to witness Suvankari becoming healthy young aspiring women, soon to be appearing B.A. final. Her journey is a testament of how a little bit of help can do so much of goodness for someone. Her transformation from illness to healthy life inspires us to do more for such causes.
                        </p>
                      </div>
                    </Card>

                    <Card className="p-6 rounded-[2.5rem] border border-[#C1D6C1] shadow-soft bg-white flex flex-col gap-4 justify-between relative overflow-hidden group">
                      <div className="absolute top-6 right-6 w-10 h-10 rounded-full bg-[#CFE8FF] flex items-center justify-center shadow-soft z-20">
                        <Quote className="w-5 h-5 transform rotate-180 text-blue-900" />
                      </div>
                      <div className="flex flex-col gap-3 z-10">
                        <h5 className="font-display font-bold text-lg text-foreground">Shweta Singh</h5>
                        <p className="text-xs text-foreground/70 leading-relaxed">
                          Shweta Singh is a student of New Sainik Public School in Delhi, living with her mother and two siblings. Her father passed away 4 years ago due to cancer. She is an intelligent and meritorious student. L4H Foundation has committed to support her education. Additionally, two L4H Foundation members, Mrs. Amrita Datta from USA and Mr. Subhendu Shekhar Mal from Kuwait have provided Shweta free online coaching in English and Science subjects. Principal of her school, Mrs. Pushpa Singh informed us that she has noticed increased confidence level in Shweta over the years. Shweta is now studying in Class X and would like to pursue higher studies in commerce.
                        </p>
                      </div>
                    </Card>

                    <Card className="p-6 rounded-[2.5rem] border border-[#C1D6C1] shadow-soft bg-white flex flex-col gap-4 justify-between relative overflow-hidden group">
                      <div className="absolute top-6 right-6 w-10 h-10 rounded-full bg-[#CFE8FF] flex items-center justify-center shadow-soft z-20">
                        <Quote className="w-5 h-5 transform rotate-180 text-blue-900" />
                      </div>
                      <div className="flex flex-col gap-3 z-10">
                        <h5 className="font-display font-bold text-lg text-foreground">Subham Pandey</h5>
                        <p className="text-xs text-foreground/70 leading-relaxed">
                          Subham Pandey is studying in B.Sc. (with Physics Honours) at Bankura Christian College, West Bengal. Subham has excellent results in both Class X (94%) and in Class XII (95.8). His education was at stake during Covid when his father’s income dwindled, and poor health further deteriorated future prospected income. L4H Foundation stepped in for assisting his higher studies by covering semester fees of college, monthly private coaching fees, and cost of books. One of our Volunteers, Dr. Mrs. Kazi Sabnam Banu from Kolkata provided him free online coaching in chemistry. He has completed his fifth semester and now in final year of B.Sc. L4H Foundation is proud to share that Subham has been selected in IIT Guwahati for pursuing master’s degree (M.Sc. in Physics). He has a desire to do research after completing master’s degree.
                        </p>
                      </div>
                    </Card>

                    <Card className="p-6 rounded-[2.5rem] border border-[#C1D6C1] shadow-soft bg-white flex flex-col gap-4 justify-between relative overflow-hidden group">
                      <div className="absolute top-6 right-6 w-10 h-10 rounded-full bg-[#CFE8FF] flex items-center justify-center shadow-soft z-20">
                        <Quote className="w-5 h-5 transform rotate-180 text-blue-900" />
                      </div>
                      <div className="flex flex-col gap-3 z-10">
                        <h5 className="font-display font-bold text-lg text-foreground">Anjali Kisku</h5>
                        <p className="text-xs text-foreground/70 leading-relaxed">
                          Anjali Kisku, is the 1st graduate from village in Bankura District, West Bengal. She is preparing for a job for which a basic computer training and soft skill development has become a necessity. Anjali belongs to a poor tribal family and her father is only earning member who works as a daily labourer Anjali was struggling to bear the cost of computer course and transportation costs for commuting from her home to nearest training centre, which is more than 20 kms from her village. L4H Foundation stepped in by providing the transportation cost and computer course fee. We are pleased to share that Anjali now has the necessary skills needed to fulfil her aspirations and wish her all the best in pursuing her journey.
                        </p>
                      </div>
                    </Card>
                  </div>
                </div>

                {/* E. Free OFFLINE Coaching to Needy Students */}
                <Card className="p-6 md:p-8 rounded-[2.5rem] border border-[#C1D6C1] shadow-soft bg-white flex flex-col gap-4">
                  <h4 className="font-display font-bold text-xl text-foreground">E. Free OFFLINE Coaching to Needy Students</h4>
                  <p className="text-xs sm:text-sm text-foreground/75 leading-relaxed">
                    During Covid 19 pandemic, all schools and institutions remained closed. The students in rural areas were struggling to continue their education. L4H Foundation explored opportunities to help needy student who can’t afford their private tuition fees. L4H Foundation launched a pilot project by selecting one of the villages in Medinipur district of West Bengal. L4H Foundation arranged free offline coaching covering 10 students by engaging local volunteers. Our plan is to develop such models in more villages by finding local volunteers who can devote their time to help and educate children.
                  </p>
                </Card>
              </motion.div>
            )}

            {activeTab === "healthcare" && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col gap-8 w-full"
              >
                {/* Overview */}
                <div className="flex flex-col gap-4">
                  <h3 className="font-display font-bold text-3xl text-foreground">Health Care NGO in Delhi Support Senior Citizen Care</h3>
                  <p className="text-sm text-foreground/80 leading-relaxed font-sans">
                    Live 4 Help (L4H) Foundation organized three medical camps in remote villages in last 2 years. Total number of beneficiaries from the camp is 397. It is observed that rural people always give lesser priority to their health check-up due to financial constraints. The rural-urban divide in healthcare is linked to the lack of healthcare literacy. The insufficient level of health awareness has a negative impact on access to healthcare. Living conditions and a low level of education are crucial barriers for rural population. The basic objectives of these medical camps were to provide free medical tests including preliminary cancer screening test to underprivileged people and create general healthcare awareness.
                  </p>
                </div>

                {/* 3-Column Grid for Medical Camps */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Camp 1 */}
                  <Card className="p-6 rounded-[2.5rem] border border-[#C1D6C1] shadow-soft bg-white flex flex-col gap-4 justify-between">
                    <div className="flex flex-col gap-3">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-5 h-5 text-primary" />
                        <h4 className="font-bold text-sm text-foreground uppercase tracking-wider">Free Medical Camp (Daspur)</h4>
                      </div>
                      <span className="text-[10px] font-semibold text-foreground/50">Held on 26th March’22</span>
                      <p className="text-xs text-foreground/70 leading-relaxed font-sans">
                        L4H Foundation organized Free Medical Camp on 26th March, 2022 in Daspur Block, Paschim Medinipur, West Bengal. Blood samples were taken by Thyrocare for 102 adults against our target of 100. Out of 102 beneficiaries, 30 were female. The people from nearby villages availed the benefits of free medical tests. The age group of beneficiaries varied from 26 years to 76 years. The blood test covered complete Hemogram, TBC, Thyroid Profile, Lipid Profile, Kidney Function Test (KFT), Liver Function Test, Iron Deficiency, Vitamin D and Vitamin B12, Blood Sugar including cancer test (PSA for Male, Ca125 for Female). The Free Medical Camp was supported by M/s ERBE (Erbe Medical India Pvt. Ltd.).
                      </p>
                    </div>
                  </Card>

                  {/* Camp 2 */}
                  <Card className="p-6 rounded-[2.5rem] border border-[#C1D6C1] shadow-soft bg-white flex flex-col gap-4 justify-between">
                    <div className="flex flex-col gap-3">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-5 h-5 text-primary" />
                        <h4 className="font-bold text-sm text-foreground uppercase tracking-wider">Free Medical Camp (Hingalganj)</h4>
                      </div>
                      <span className="text-[10px] font-semibold text-foreground/50">Held on 28th December’22</span>
                      <p className="text-xs text-foreground/70 leading-relaxed font-sans mb-2">
                        The basic objective of this medical camp was to provide free medical test including preliminary cancer screening test to underprivileged people, mainly adults of age group 30 years and above. Rural people in Sundarban area never got opportunity to do medical test due to remote location and unavailability of diagnostic center. This Medical Camp had special significance. The First time such medical camp was held at the far remote corner of the delta and the last human habitat, after which the core of Sundarban National Park starts.
                      </p>
                      <p className="text-xs text-foreground/70 leading-relaxed font-sans mb-2">
                        M/s ERBE (Erbe Medical India Pvt. Ltd.) supported the Medical Camp through their Corporate Social Responsibility (CSR). 125 beneficiaries availed this benefit. Thyrocare Kolkata took the blood sample and provided test report.
                      </p>
                      <div className="border-t border-foreground/5 pt-2">
                        <span className="text-xs font-semibold text-foreground block mb-1">The medical test included:</span>
                        <ul className="list-disc pl-5 text-[11px] text-foreground/75 flex flex-col gap-1 leading-normal font-sans">
                          <li>Complete Hemogram</li>
                          <li>Cancer Test (PSA for Male, Ca125 for Female)</li>
                          <li>Thyroid Profile and Lipid Profile</li>
                          <li>Kidney Function Test and Liver Function Test</li>
                          <li>Iron Deficiency</li>
                          <li>Blood Sugar</li>
                        </ul>
                      </div>
                    </div>
                  </Card>

                  {/* Camp 3 */}
                  <Card className="p-6 rounded-[2.5rem] border border-[#C1D6C1] shadow-soft bg-white flex flex-col gap-4 justify-between">
                    <div className="flex flex-col gap-3">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-5 h-5 text-primary" />
                        <h4 className="font-bold text-sm text-foreground uppercase tracking-wider">Free Medical Camp (Sundarban)</h4>
                      </div>
                      <span className="text-[10px] font-semibold text-foreground/50">Held on 29th December’23</span>
                      <p className="text-xs text-foreground/70 leading-relaxed font-sans">
                        L4H Foundation organized third Free Medical Camp on 29th December, 2023 in Sundarban area of West Bengal. 170 beneficiaries mostly adults availed this benefit. The medical camp includes free blood test covering Complete Hemogram, Cancer Test – PSA for Male and Ca125 for Female, Thyroid Profile and Lipid Profile, Kidney Function Test and Liver Function Test, Iron Deficiency, Blood Sugar. The foundation arranged five doctors (3 male and 2 female) to provide free consultation during camp and after availability of blood test report.
                      </p>
                      <p className="text-xs text-foreground/70 leading-relaxed font-sans">
                        M/s ERBE (Erbe Medical India Pvt. Ltd.) supported the Medical Camp through their Corporate Social Responsibility (CSR).
                      </p>
                    </div>
                  </Card>
                </div>

                {/* 4. Cancer Awareness Workshops */}
                <Card className="p-6 md:p-8 rounded-[2.5rem] border border-[#C1D6C1] shadow-soft bg-white">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    <div className="lg:col-span-7 flex flex-col gap-5">
                      <div className="flex items-center gap-3 border-b border-foreground/5 pb-4">
                        <Activity className="w-6 h-6 text-primary" />
                        <h4 className="font-display font-bold text-xl text-foreground">4. Cancer Awareness Workshops</h4>
                      </div>
                      <p className="text-xs sm:text-sm text-foreground/75 leading-relaxed font-sans">
                        L4H Foundation organized 1st Cancer Awareness Session at Bhagbanchak Patiram Shikha Niketan, Medinipur, West Bengal and 2nd Cancer Awareness Session at Gobindakati Sikshaniketan High School, Hingalganj West Bengal. Both sessions were facilitated by Dr. Shyamsundar Mondal, retired ex. HOD, Department of Epidemiology and Biostatistics, Chittaranjan National Cancer Institute, Kolkata and attended by school students, local people. Dr. S. Mondal’s lucid explanation was well appreciated by all attendees.
                      </p>
                      <p className="text-xs sm:text-sm text-foreground/75 leading-relaxed font-sans">
                        The L4H Foundation is organizing similar program at regular intervals to create awareness and reach out to large population in future and thereby to help people in early detection and treatment.
                      </p>
                      <div className="bg-[#FFE6D4] p-5 rounded-2xl border border-[#EEB898]/40 flex flex-col gap-3">
                        <span className="text-xs sm:text-sm font-bold text-foreground font-sans">The basic objectives of cancer awareness program are:</span>
                        <ul className="flex flex-col gap-2 text-xs text-foreground/75 pl-1 leading-relaxed font-sans">
                          <li><strong>a)</strong> Remove the stigma and fear attached with cancer.</li>
                          <li><strong>b)</strong> Help people recognize the early signs and symptoms of cancer.</li>
                          <li><strong>c)</strong> Inform people about the importance of regular screening and check-ups.</li>
                          <li><strong>d)</strong> Inform women about mammograms, clinical breast exam and breast self-exam.</li>
                        </ul>
                      </div>
                      <p className="text-xs sm:text-sm text-foreground/75 leading-relaxed font-sans">
                        The Foundation has procured Breast Examination Simulator with a donation from one of our Patrons. The simulator is used during cancer awareness program for educating woman about breast self-exam.
                      </p>
                    </div>

                    <div className="lg:col-span-5 flex flex-col gap-6 w-full">
                      <div className="aspect-[16/10] w-full rounded-[2rem] overflow-hidden border border-white shadow-soft relative">
                        <img referrerPolicy="no-referrer"
                          src="https://live4help.org/wp-content/uploads/2022/04/L4H-Medical-Camp-Photo-1.jpg"
                          alt="Cancer Awareness Workshops & Medical Camp"
                          className="w-full h-full object-cover absolute inset-0"
                        />
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            )}

            {activeTab === "environment" && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start"
              >
                <div className="lg:col-span-7 flex flex-col gap-6">
                  <h3 className="font-display font-bold text-3xl text-foreground">Sundarbans Mangrove Buffer Zones</h3>
                  <p className="text-sm text-foreground/80 leading-relaxed">
                    Sundarbans delta region is extremely vulnerable to severe cyclone erosion (such as Amphan and Yaas). To check soil erosion, protect coastal borders, and provide natural storm surge barriers, we lead community-led mangrove plantation programs.
                  </p>
                  <Card className="p-6 rounded-[2.5rem] border border-[#C1D6C1] flex flex-col gap-4 shadow-soft">
                    <span className="font-semibold text-sm text-foreground">Plantation and Survival Care:</span>
                    <ul className="list-disc pl-5 text-xs text-foreground/70 flex flex-col gap-2 leading-relaxed">
                      <li>Planted approximately 4,000 mangrove saplings across three plantation drives (November 2, 2021, January 26, 2022, and December 30, 2023).</li>
                      <li>Cultivated resilient local species including Sundari, Bain, Kakra, Garjan, Golpata, and Dhuldhul.</li>
                      <li>Post-plantation maintenance: Sourced local bamboo and nets to build extensive fences, guarding the saplings against cattle. We maintain the plantation for 3 years to ensure long-term sustainability.</li>
                      <li>The saplings have shown excellent growth, reaching an average height of 8 to 12 feet.</li>
                    </ul>
                  </Card>
                </div>
                <div className="lg:col-span-5 flex flex-col gap-6">
                  <Card className="p-8 rounded-[2.5rem] border border-[#C1D6C1] shadow-soft">
                    <h4 className="font-display font-bold text-lg text-foreground mb-4 flex items-center gap-2">
                      <Building className="w-5 h-5 text-secondary" />
                      Key Plantation Drives
                    </h4>
                    <ul className="flex flex-col gap-3 text-xs text-foreground/75">
                      <li className="flex justify-between border-b border-foreground/5 pb-2"><span>First Drive (Nov 2021)</span> <span className="font-semibold text-foreground">1000+ Saplings</span></li>
                      <li className="flex justify-between border-b border-foreground/5 pb-2"><span>Second Drive (Jan 2022)</span> <span className="font-semibold text-foreground">2000+ Saplings</span></li>
                      <li className="flex justify-between border-b border-foreground/5 pb-2"><span>Third Drive (Dec 2023)</span> <span className="font-semibold text-foreground">1000+ Saplings</span></li>
                      <li className="flex justify-between pb-1"><span>CSR Partner</span> <span className="font-semibold text-foreground">ABS Professional India</span></li>
                    </ul>
                  </Card>
                  <div className="aspect-[16/10] w-full rounded-[2rem] overflow-hidden border border-white shadow-soft relative">
                    <img referrerPolicy="no-referrer"
                      src="https://live4help.org/wp-content/uploads/2022/02/Live-4-Help-Mangrove-Plantation-26th-Jan22_Photo-39.jpg"
                      alt="Sundarban Mangrove Plantation Campaign"
                      className="w-full h-full object-cover absolute inset-0"
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === "relief" && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start"
              >
                <div className="lg:col-span-7 flex flex-col gap-6">
                  <h3 className="font-display font-bold text-3xl text-foreground">Winter Relief & Other Social Works</h3>
                  <p className="text-sm text-foreground/80 leading-relaxed">
                    In response to seasonal hardships, Live 4 Help Foundation coordinates annual blanket distribution campaigns to protect daily wagers, construction workers, and daily wage labor families from severe cold waves.
                  </p>
                  <div className="flex flex-col gap-4">
                    <Card className="p-6 rounded-[2.5rem] border border-[#C1D6C1] shadow-soft">
                      <h4 className="font-semibold text-sm text-foreground mb-3">Key Blanket Distribution Drives (480 total)</h4>
                      <ul className="flex flex-col gap-2.5 text-xs text-foreground/75 list-disc pl-5 leading-relaxed">
                        <li><strong>December 29, 2023:</strong> Distributed 160 heavy blankets to rural villagers in North 24 Parganas, West Bengal.</li>
                        <li><strong>January 15, 2023:</strong> Sourced and delivered 100 blankets to construction daily laborers at Government Boys Senior Secondary School, Jharoda Kalan, New Delhi.</li>
                        <li><strong>December 27, 2022:</strong> Distributed 200 winter blankets across the vulnerable rural Sundarbans delta stretches.</li>
                        <li><strong>January 14, 2021:</strong> Distributed 20 blankets to daily wage park laborers at Sec 19B DDA Park, Dwarka, New Delhi.</li>
                      </ul>
                    </Card>

                    <Card className="p-6 rounded-[2.5rem] border border-[#C1D6C1] shadow-soft">
                      <h4 className="font-semibold text-sm text-foreground mb-2">Dwarka Clothes Distribution Drive</h4>
                      <p className="text-xs text-foreground/75 leading-relaxed">
                        On August 15, 2021, L4H volunteers distributed wearable old clothes to approximately 30 daily wager families living in roadside tents near Dwarka Sector 19, New Delhi.
                      </p>
                    </Card>
                  </div>
                </div>
                
                <div className="lg:col-span-5 flex flex-col gap-6">
                  <Card className="p-8 rounded-[2.5rem] border border-[#C1D6C1] shadow-soft">
                    <h4 className="font-display font-bold text-lg text-foreground mb-4 flex items-center gap-2">
                      <HeartHandshake className="w-5 h-5 text-primary" />
                      Relief Outreach Summary
                    </h4>
                    <ul className="flex flex-col gap-3 text-xs text-foreground/75">
                      <li className="flex justify-between border-b border-foreground/5 pb-2"><span>Total Blankets</span> <span className="font-semibold text-foreground">480 Blankets</span></li>
                      <li className="flex justify-between border-b border-foreground/5 pb-2"><span>Primary Recipients</span> <span className="font-semibold text-foreground">Migrant Labor & Villagers</span></li>
                      <li className="flex justify-between pb-1"><span>Locations Served</span> <span className="font-semibold text-foreground">Delhi NCR & West Bengal</span></li>
                    </ul>
                  </Card>
                  <div className="aspect-[16/10] w-full rounded-[2rem] overflow-hidden border border-white shadow-soft relative">
                    <img referrerPolicy="no-referrer"
                      src="https://live4help.org/wp-content/uploads/2021/11/Cloth-Distribution-Photo-3.jpg"
                      alt="Relief Work & Blanket Distribution"
                      className="w-full h-full object-cover absolute inset-0"
                    />
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

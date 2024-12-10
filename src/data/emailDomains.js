export const emailDomains = [
  { collegeName: "IIT Bombay", emailDomain: "iitb.ac.in" },
  { collegeName: "IIT Delhi", emailDomain: "iitd.ac.in" },
  { collegeName: "IIT Madras", emailDomain: "iitm.ac.in" },
  { collegeName: "IIT ISM Dhanbad", emailDomain: "iitism.ac.in" },
  { collegeName: "IIT Kanpur", emailDomain: "iitk.ac.in" },
  { collegeName: "IIT Kharagpur", emailDomain: "iitkgp.ac.in" },
  { collegeName: "IIT Roorkee", emailDomain: "iitr.ac.in" },
  { collegeName: "IIT Guwahati", emailDomain: "iitg.ac.in" },
  { collegeName: "IIT Hyderabad", emailDomain: "iith.ac.in" },
  { collegeName: "IIT Indore", emailDomain: "iiti.ac.in" },
  { collegeName: "IIT Ropar", emailDomain: "iitrpr.ac.in" },
  { collegeName: "IIT Gandhinagar", emailDomain: "iitgn.ac.in" },
  { collegeName: "IIT Patna", emailDomain: "iitp.ac.in" },
  { collegeName: "IIT Mandi", emailDomain: "iitmandi.ac.in" },
  { collegeName: "IIT Jodhpur", emailDomain: "iitj.ac.in" },
  { collegeName: "IIT Bhubaneswar", emailDomain: "iitbbs.ac.in" },
  { collegeName: "IIT Varanasi", emailDomain: "iitbhu.ac.in" },
  { collegeName: "IIT Tirupati", emailDomain: "iittp.ac.in" },
  { collegeName: "IIT Palakkad", emailDomain: "iitpkd.ac.in" },
  { collegeName: "IIT Goa", emailDomain: "iitgoa.ac.in" },
  { collegeName: "IIT Jammu", emailDomain: "iitjammu.ac.in" },
  { collegeName: "IIT Bhilai", emailDomain: "iitbhilai.ac.in" },
];

export const getEmailDomain = (collegeName) => {
  const college = emailDomains.find(c => c.collegeName === collegeName);
  return college ? college.emailDomain : "Domain not found";
};
  
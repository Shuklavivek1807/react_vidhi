import { Container, Row, Col } from "reactstrap";
import CountUp from "react-countup";
import { useEffect, useState } from "react";

const AboutLaw=()=>{
    useEffect(()=>{
        window.scrollTo(0, 0);
    },[]);
    const [benefit, setBenefit] = useState([
        {
            para: "Law or legal profession is one of the most coveted vocation in India today given the power and respect attached and also the security of career it gives right after 10+2, just like medicine and engineering. The image of a lawyer has undergone one of the sharpest face-lifts ever. The version of a modern lawyer is one of a well respected, well groomed and well paid professional, whose identity is not circumscribed by the court-room alone, but extends to the corridors of corporate power houses and international organisations."
        },
        {
            para: `To some extent, this change in perception can be credited to the rising influence of the National Law Universities (NLU's), widely acknowledged as the leading institutions of legal learning in the country today. In the words of Prime Minister Manmohan Singh the NLU's are, "a small number of dynamic and outstanding law schools" in the country, which "remain islands of excellence amidst a sea of institutionalised mediocrity." It all began with the establishment of the National Law School of India University (NLSIU) in Bangalore in 1987 which experimented with a highly rigorous five year BA.LLB model, where students fresh out of high school were subjected to an intensive training programme that combined theory and practice and mandated continuous evaluation and copious amounts of legal writing and research. They were also encouraged to participate widely in co-curricular and extra curricular activities such as moot courts. It was hoped that at the end of the training, these freshly minted graduates would go on to take their rightful place as social engineers. Since the establishment of NLSIU, 14 other NLU's have cropped up over the years in different states. Similarly, prestigious law schools have opened up in all parts of India and are dedicated towards imparting world-class legal education.`
        },
        {
            para:`The growth of law as a career owes, in some part to India's liberalisation reforms in 1990s; this opening up of the economy threw up unprecedented business opportunities, and demanded a new set of skilled corporate transactional lawyers. Little wonder then that many of the leading law schools have near perfect placement statistics and their graduate earn some of the highest entry level salaries, competing with the best from the IIT's and IIM's. Top graduates from the top NLU's can earn as much as Rs.15 lakh per annum soon after graduation. Of course, not all graduates opt for such high paying jobs at law firms and corporate houses. Some prefer to join NGO's and leverage their legal skills to bring about social change in areas such as human rights and environmental protection. Others join international organisations such as the UN, World Bank and the WTO with a view to contributing towards world peace, conflict resolution and a more efficient framework for international trade. Yet others go on to pursue careers in research, teaching and policy advocacy, often after completing higher studies (LLM) from globally reputed institutions; a career choice made more feasible now, thanks to the fifth pay commission pay outs. More recently, some appear to have been bitten by the entrepreneurial bug, starting up their own businesses, such as legal process outsourcing units. Others are beginning to experiment with niche areas such as legal journalism.`
        },
        {
            para:`One might argue that the sheer range and diversity of career options thrown up by a law degree is unmatched by any other professional degree. For law is intrinsically a multi-disciplinary endeavour and the content of law has to necessarily draw from other disciplines. Illustratively, the criminal lawyer has to have some understanding of human psychology and forensic science, the corporate lawyer an understanding of commerce and capital, and the intellectual property lawyer, a basic understanding of science.`
        },
        {
            para:`If not for anything else, a law degree arms one with serious advocacy skills, enabling one to argue in favour of any cause. In fact, if one were to roll back the pages of our history, one finds that many of our freedom fighters such as Mahatma Gandhi and Jawaharlal Nehru were armed with legal training, which stood them in good stead in their fight against the British. The nexus between law and political leadership continues to be a strong one to this day, with several leading politicians possessing law degrees the world over, the most notable example being Barrack Obama, the President of the United Sates of America.`
        },
        {
            para:`Potential entrants to the various NLU's are selected via an entrance exam, CLAT (common law admission test) which tests students on their levels of English comprehension, their capacity for logical and legal reasoning, elementary mathematics and their awareness of current affairs. Last year, approximately 40,000 candidates appeared for the CLAT exam, of which only 1,200 or so were selected for admission to the various NLUs. This highly competitive filter ensures that the very best and brightest of applicants are selected. Little wonder then that the reputation of the NLU's, has much more to do with their student quality and less with infrastructure and faculty quality.`
        },
        {
            para:`Given the rising importance of lawyers in today's global economy and the metamorphosis in perception, it is not surprising that law now is coming to be a first choice for many high school students. In fact, the reputation of Indian law graduates has crossed seven seas, with the result that international lawfirms and global consultancies such as McKinsey are flocking in large numbers to India to recruit directly for their London and Paris offices.`
        },
        {
            para:`Law, or the legal profession, stands as one of the most esteemed vocations in India today. It carries with it not only a sense of power and respect but also the assurance of a secure career right after completing one's 10+2 education, much like the fields of medicine and engineering. The modern lawyer is perceived as a highly respected, well-groomed, and well-compensated professional. Their identity is not confined solely to the courtroom; it extends into the influential realms of corporate powerhouses and international organizations.`
        },
        {
            para:`To a considerable extent, the evolution of this perception can be attributed to the growing prominence of National Law Universities (NLU's), recognized as the premier institutions for legal education in the country today. In the words of former Prime Minister Manmohan Singh, NLU's are described as 'a small number of dynamic and outstanding law schools' in India, standing as 'islands of excellence amidst a sea of institutionalized mediocrity.'`
        },
        {
            para:`The transformative journey began with the establishment of the National Law School of India University (NLSIU) in Bangalore in 1987. Students fresh out of high school were subjected to an intensive training programme that combined theory and practice and mandated continuous evaluation and copious amounts of legal writing and research. Participation in co-curricular and extracurricular activities, such as moot courts, was also actively encouraged. The aspiration was to equip these fresh graduates to become catalysts for social change.`
        },
        {
            para:`Since the inception of NLSIU, other NLU's have emerged in various states, and prestigious law schools have also sprung up across the country.These institutions are dedicated to delivering world-class legal education.`
        },
        {
            para:`The expansion of law as a career owes, in part, to India's liberalization reforms in the 1990s. This opened up the economy creating unprecedented business opportunities, demanding a new cadre of skilled corporate transactional lawyers. . It's no surprise that many of the leading law schools boast near-perfect placement records, with their graduates commanding some of the highest entry-level salaries, on par with the best from prestigious institutions like the IITs and IIMs.`
        },
        {
            para:`Top graduates from the National Law Universities (NLU's) can earn as much as Rs. 15 lakh per annum shortly after graduation. However, not all graduates choose high-paying positions at law firms and corporate entities. Some opt to join NGOs, harnessing their legal expertise to drive social change in areas such as human rights and environmental protection. Others embark on careers in international organizations like the UN, World Bank, and the WTO, aiming to contribute to global peace, conflict resolution, and the development of a more efficient international trade framework. Some graduates pursue research, teaching, and policy advocacy, often after completing advanced studies (LLM) at globally renowned institutions—a career path made more accessible due to the financial benefits from the fifth pay commission.`
        },
        {
            para:`More recently, some appear to have been bitten by the entrepreneurial bug, starting up their own businesses, such as legal process outsourcing units. Others are beginning to experiment with niche areas such as legal journalism.`
        },
        {
            para:`One might argue that the sheer range and diversity of career options presented by a law degree is unmatched by any other professional degree. This is due to the inherently interdisciplinary nature of law, which inherently incorporates elements from various other fields of knowledge. To illustrate, a criminal lawyer must possess some familiarity with human psychology and forensic science, a corporate lawyer needs to comprehend principles of commerce and finance, and an intellectual property lawyer should have a rudimentary grasp of scientific concepts.`
        },
        {
            para:`If not for anything else, a law degree equips an individual with formidable advocacy skills, allowing them to effectively argue in support of any cause. Looking back at our history, we discover that many of our freedom fighters, including Mahatma Gandhi and Jawaharlal Nehru, had a legal education that served them well in their struggle against British colonialism. The nexus between law and political leadership continues to be a strong one to this day, with numerous prominent politicians worldwide holding law degrees. A striking instance of this is Barrack Obama, the former President of the United States of America.`
        },
        {
            para:`Prospective candidates seeking admission to various National Law Universities (NLUs) must undergo a rigorous entrance examination known as CLAT Exam (Common Law Admission Test). The CLAT assesses students' English comprehension, logical and legal reasoning abilities, basic mathematics, and their awareness of current affairs. In the previous year, around 40,000 candidates took the CLAT exam, but only approximately 1,200 of them were admitted to the various NLUs. This intense competition acts as a stringent filter, ensuring that only the most outstanding and talented applicants are chosen. As a result, the reputation of the NLUs is primarily attributed to the caliber of their students rather than the quality of their infrastructure or faculty. This is the major reason due to which the students take classes for CLAT preparation and prefer Maansarovar Law Centre as it is one of the best institute for CLAT preparation.`
        },
        {
            para:`Considering the growing significance of lawyers in today's global economy and the substantial shift in perception, it's hardly astonishing that law is increasingly becoming the preferred career path for numerous high school students. Notably, the reputation of Indian law graduates has gained recognition on a global scale. This recognition has led to international law firms and prominent global consulting companies like McKinsey actively seeking to recruit talent in India for their offices in London and Paris.`
        }
      ]);      
      

        return(
            <section>
            <div class="text-center mb-5 col-lg-12" style={{paddingTop:"15px"}}><h2 class="fw-bold">About Law</h2></div>
      <Container>
        <Row>
            <div className="about__content">
              {benefit.map((item,key)=>(
                <p>{item.para}</p>
              ))}
            </div>
        </Row>
      </Container>
            </section>
        )
}

export default AboutLaw;
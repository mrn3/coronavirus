import React from 'react';
import Page from './Page';

export default function Privacy(props) {
    const currentPath = props.location.pathname;
    return (
        <Page currentPath={currentPath}>
            <h1>Welcome to our Privacy Policy</h1>
            <h3>Your privacy is critically important to us.</h3>
            Second Metrics is located at:<br />
            <br />
            <address>
                Second Metrics<br />
                11562 Roselawn Way<br />
                South Jordan, UT 84009<br />
                United States<br />
                (801) 448-6396
            </address>

            <p>It is Second Metrics's policy to respect your privacy regarding any information we may collect while operating our website. This Privacy Policy applies to <a href="https://secondmetrics.com">https://secondmetrics.com</a> (hereinafter, "us", "we", or "https://secondmetrics.com"). We respect your privacy and are committed to protecting personally identifiable information you may provide us through the Website. We have adopted this privacy policy ("Privacy Policy") to explain what information may be collected on our Website, how we use this information, and under what circumstances we may disclose the information to third parties. This Privacy Policy applies only to information we collect through the Website and does not apply to our collection of information from other sources.</p>
            <p>This Privacy Policy, together with the Terms and conditions posted on our Website, set forth the general rules and policies governing your use of our Website. Depending on your activities when visiting our Website, you may be required to agree to additional terms and conditions.</p>

            <h2>Website Visitors</h2>
            <p>Like most website operators, Second Metrics collects non-personally-identifying information of the sort that web browsers and servers typically make available, such as the browser type, language preference, referring site, and the date and time of each visitor request. Second Metrics's purpose in collecting non-personally identifying information is to better understand how Second Metrics's visitors use its website. From time to time, Second Metrics may release non-personally-identifying information in the aggregate, e.g., by publishing a report on trends in the usage of its website.</p>
            <p>Second Metrics also collects potentially personally-identifying information like Internet Protocol (IP) addresses for logged in users and for users leaving comments on https://secondmetrics.com blog posts. Second Metrics only discloses logged in user and commenter IP addresses under the same circumstances that it uses and discloses personally-identifying information as described below.</p>

            <h2>Gathering of Personally-Identifying Information</h2>
            <p>Certain visitors to Second Metrics's websites choose to interact with Second Metrics in ways that require Second Metrics to gather personally-identifying information. The amount and type of information that Second Metrics gathers depends on the nature of the interaction. For example, we ask visitors who sign up for a blog at https://secondmetrics.com to provide a username and email address.</p>

            <h2>Security</h2>
            <p>The security of your Personal Information is important to us, but remember that no method of transmission over the Internet, or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your Personal Information, we cannot guarantee its absolute security.</p>

            <h2>Advertisements</h2>
            <p>Ads appearing on our website may be delivered to users by advertising partners, who may set cookies. These cookies allow the ad server to recognize your computer each time they send you an online advertisement to compile information about you or others who use your computer. This information allows ad networks to, among other things, deliver targeted advertisements that they believe will be of most interest to you. This Privacy Policy covers the use of cookies by Second Metrics and does not cover the use of cookies by any advertisers.</p>

            <h2>Links To External Sites</h2>
            <p>Our Service may contain links to external sites that are not operated by us. If you click on a third party link, you will be directed to that third party's site. We strongly advise you to review the Privacy Policy and terms and conditions of every site you visit.</p>
            <p>We have no control over, and assume no responsibility for the content, privacy policies or practices of any third party sites, products or services.</p>

            <h2>Aggregated Statistics</h2>
            <p>Second Metrics may collect statistics about the behavior of visitors to its website. Second Metrics may display this information publicly or provide it to others. However, Second Metrics does not disclose your personally-identifying information.</p>

            <h2>Cookies</h2>
            <p>To enrich and perfect your online experience, Second Metrics uses "Cookies", similar technologies and services provided by others to display personalized content, appropriate advertising and store your preferences on your computer.</p>
            <p>A cookie is a string of information that a website stores on a visitor's computer, and that the visitor's browser provides to the website each time the visitor returns. Second Metrics uses cookies to help Second Metrics identify and track visitors, their usage of https://secondmetrics.com, and their website access preferences. Second Metrics visitors who do not wish to have cookies placed on their computers should set their browsers to refuse cookies before using Second Metrics's websites, with the drawback that certain features of Second Metrics's websites may not function properly without the aid of cookies.</p>
            <p>By continuing to navigate our website without changing your cookie settings, you hereby acknowledge and agree to Second Metrics's use of cookies.</p>
            
            <h2>Privacy Policy Changes</h2>
            <p>Although most changes are likely to be minor, Second Metrics may change its Privacy Policy from time to time, and in Second Metrics's sole discretion. Second Metrics encourages visitors to frequently check this page for any changes to its Privacy Policy. Your continued use of this site after any change in this Privacy Policy will constitute your acceptance of such change.</p>
        </Page>
    )
}
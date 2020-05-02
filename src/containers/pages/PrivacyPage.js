import React from 'react';
import raw from 'raw.macro';
import MarkdownPage from '../../components/MarkdownPage';
const markdown = raw(`../../assets/md/privacy-policy.md`);

const PrivacyPage = (props) => <MarkdownPage>{markdown}</MarkdownPage>;

export default PrivacyPage
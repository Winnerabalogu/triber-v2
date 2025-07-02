"use client"

import JobDetailsModal from './JobDetailsModal';
import JobApplicationModal from './JobApplicationModal';
import LinkedInShareModal from './LinkedInShareModal';
import StoryDetailsModal from './StoryDetailsModal'
import ArticleDetailsModal from './ArticleDetailsModal';
import ConfirmQuitModal from './ConfirmQuitModal';
import ConfirmDeleteAccountModal from './ConfirmDeleteAccountModal';
import ProfileUpdateModal from './ProfileUpdateModal';
import ConfirmPasswordUpdateModal from './ConfirmPasswordUpdateModal';
import ValuationDetailModal from './ValuationDetailModal';
import ValuationReportModal from './ValuationReportModal';

export default function ModalManager() {
  return (
    <>
      <JobDetailsModal />
      <JobApplicationModal />
      <LinkedInShareModal />
      <StoryDetailsModal />
      <ArticleDetailsModal />
      <ConfirmQuitModal/>
      <ConfirmDeleteAccountModal/>
      <ProfileUpdateModal />
      <ConfirmPasswordUpdateModal />
       <ValuationDetailModal />
       <ValuationReportModal />
    </>
  );
};
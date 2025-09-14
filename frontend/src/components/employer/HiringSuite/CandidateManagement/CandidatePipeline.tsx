import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult, DroppableProvided, DraggableProvided, DroppableStateSnapshot, DraggableStateSnapshot } from '@hello-pangea/dnd';
import { Users, Search, Filter, Calendar, FileText, Clipboard } from 'lucide-react'; // Using Clipboard as an alternative for Note
import InterviewScheduler from '../InterviewScheduling/InterviewScheduler'; // Corrected import path for InterviewScheduler

interface Candidate {
  id: string;
  name: string;
  jobTitle: string;
  stage: string;
  avatar: string;
  resume: string;
  notes: string;
  testResult: 'passed' | 'failed' | null;
}

interface PipelineData {
  stages: { id: string; name: string; color: string }[];
  candidates: Candidate[];
}

// Mock data for candidate pipeline stages and candidates
const initialData: PipelineData = {
  stages: [
    { id: 'new', name: 'New Applicants', color: 'bg-blue-100 text-blue-800' },
    { id: 'screening', name: 'Screening', color: 'bg-yellow-100 text-yellow-800' },
    { id: 'test_result', name: 'Test & Result', color: 'bg-orange-200 text-orange-800' }, // Merged Test and Result stages
    { id: 'interviewing', name: 'Interviewing', color: 'bg-purple-100 text-purple-800' },
    { id: 'offer', name: 'Offer Extended', color: 'bg-green-100 text-green-800' },
    { id: 'hired', name: 'Hired', color: 'bg-teal-100 text-teal-800' },
    { id: 'rejected', name: 'Rejected', color: 'bg-red-100 text-red-800' },
  ],
  candidates: [
    { id: 'cand-1', name: 'Alice Johnson', jobTitle: 'Frontend Developer', stage: 'new', avatar: 'A', resume: 'alice_resume.pdf', notes: 'Initial screening passed.', testResult: null },
    { id: 'cand-2', name: 'Bob Williams', jobTitle: 'Backend Engineer', stage: 'screening', avatar: 'B', resume: 'bob_resume.pdf', notes: 'Needs technical assessment.', testResult: null },
    { id: 'cand-3', name: 'Charlie Brown', jobTitle: 'UI/UX Designer', stage: 'interviewing', avatar: 'C', resume: 'charlie_resume.pdf', notes: 'First interview scheduled for tomorrow.', testResult: null },
    { id: 'cand-4', name: 'Diana Davis', jobTitle: 'DevOps Specialist', stage: 'new', avatar: 'D', resume: 'diana_resume.pdf', notes: '', testResult: null },
    { id: 'cand-5', name: 'Ethan Miller', jobTitle: 'Frontend Developer', stage: 'offer', avatar: 'E', resume: 'ethan_resume.pdf', notes: 'Offer accepted, pending background check.', testResult: null },
  ],
};

const CandidatePipeline: React.FC = () => {
  const [pipelineData, setPipelineData] = useState<PipelineData>(initialData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState<any>(null); // State to hold candidate data for modal

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return;
    }

    const { source, destination } = result;

    // If dropped in the same list, reorder
    if (source.droppableId === destination.droppableId) {
      const candidatesInStage = pipelineData.candidates.filter(c => c.stage === source.droppableId);
      const reorderedCandidatesInStage = Array.from(candidatesInStage);
      const [movedCandidate] = reorderedCandidatesInStage.splice(source.index, 1);
      reorderedCandidatesInStage.splice(destination.index, 0, movedCandidate);

      const updatedCandidates = pipelineData.candidates.map(c => {
        if (c.stage === source.droppableId) {
          // Find the index of this candidate in the reordered list
          const newIndex = reorderedCandidatesInStage.findIndex(cand => cand.id === c.id);
          if (newIndex !== -1) {
            // This part is tricky for reordering within a stage without a dedicated order property.
            // For now, we'll focus on stage changes. A proper reorder would need more state management.
            return c; // No change in stage, reordering logic is complex and omitted for now.
          }
        }
        return c;
      });
      // setPipelineData({ ...pipelineData, candidates: updatedCandidates }); // Reordering logic is complex and omitted for now.

    } else {
      // If dropped in a different list, move the candidate and update stage
      const candidateId = result.draggableId;
      const candidateIndex = pipelineData.candidates.findIndex(c => c.id === candidateId);
      if (candidateIndex === -1) return;

      const updatedCandidates = [...pipelineData.candidates];
      const movedCandidate = updatedCandidates[candidateIndex]; // Get the candidate object
      movedCandidate.stage = destination.droppableId; // Update its stage

      // If moved to 'test_result' stage, open modal for test result
      if (destination.droppableId === 'test_result') {
        setCandidateForTestResult(movedCandidate); // Set the candidate for the modal
        setIsTestResultModalOpen(true); // Open the modal
      } else {
        // For other stage changes, update the pipeline data
        setPipelineData({ ...pipelineData, candidates: updatedCandidates });
      }
    }
  };

  const handleOpenModal = (candidate: any) => {
    setSelectedCandidate(candidate);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCandidate(null);
  };

  // State and handlers for Test Result Modal
  const [isTestResultModalOpen, setIsTestResultModalOpen] = useState(false);
  const [candidateForTestResult, setCandidateForTestResult] = useState<any>(null);

  const handleOpenTestResultModal = (candidate: any) => {
    setCandidateForTestResult(candidate);
    setIsTestResultModalOpen(true);
  };

  const handleCloseTestResultModal = () => {
    setIsTestResultModalOpen(false);
    setCandidateForTestResult(null);
  };

  const handleSaveTestResult = (result: 'passed' | 'failed') => {
    if (!candidateForTestResult) return;

    const updatedCandidates = pipelineData.candidates.map(c => {
      if (c.id === candidateForTestResult.id) {
        return {
          ...c,
          testResult: result,
          stage: 'test_result', // Automatically move to 'test_result' stage after test
        };
      }
      return c;
    });
    setPipelineData({ ...pipelineData, candidates: updatedCandidates });
    handleCloseTestResultModal(); // Close the modal after saving
  };

  // Handler for scheduling an interview from the pipeline
  const handleScheduleInterviewFromPipeline = (newInterviewDetails: { date: string; time: string; duration: string; candidateName: string; jobTitle: string }) => {
    const candidateId = pipelineData.candidates.find(c => c.name === newInterviewDetails.candidateName)?.id;
    if (!candidateId) return;

    const updatedCandidates = pipelineData.candidates.map(c => {
      if (c.id === candidateId) {
        // Add a note about the scheduled interview and potentially move to 'interviewing' stage
        const interviewNote = `Interview scheduled for ${newInterviewDetails.date} at ${newInterviewDetails.time} (${newInterviewDetails.duration} mins).`;
        const updatedNotes = c.notes ? `${c.notes}\n${interviewNote}` : interviewNote;
        
        // Ensure candidate is in the 'interviewing' stage if not already
        const stage = c.stage === 'new' || c.stage === 'screening' ? 'interviewing' : c.stage;

        return {
          ...c,
          notes: updatedNotes,
          stage: stage,
        };
      }
      return c;
    });

    setPipelineData({ ...pipelineData, candidates: updatedCandidates });
    handleCloseModal(); // Close the modal after scheduling
  };

  return (
    <div className="glass-card p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Candidate Pipeline</h3>
          <p className="text-sm text-gray-600">Track candidates through the hiring process.</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <input type="text" placeholder="Search candidates..." className="input-field pl-10 w-64" />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          </div>
          <button className="btn-outline flex items-center space-x-2">
            <Filter className="w-4 h-4" />
            <span>Filter</span>
          </button>
        </div>
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex overflow-x-auto space-x-6 pb-4">
          {pipelineData.stages.map((stage) => (
            <Droppable key={stage.id} droppableId={stage.id}>
              {(provided: DroppableProvided, snapshot: DroppableStateSnapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className={`w-80 flex-shrink-0 rounded-lg p-4 ${snapshot.isDraggingOver ? 'bg-blue-50' : stage.color + ' bg-opacity-50'}`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <h4 className={`text-md font-bold ${stage.color}`}>{stage.name}</h4>
                    <span className="text-sm text-gray-600">{pipelineData.candidates.filter(c => c.stage === stage.id).length}</span>
                  </div>
                  <div className="min-h-[400px] space-y-3">
                    {pipelineData.candidates
                      .filter(candidate => candidate.stage === stage.id)
                      .map((candidate, index) => (
                        <Draggable key={candidate.id} draggableId={candidate.id} index={index}>
                          {(provided: DraggableProvided, snapshot: DraggableStateSnapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className={`bg-white p-4 rounded-lg shadow-md cursor-grab ${snapshot.isDragging ? 'rotate-3' : ''}`}
                            >
                              <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center">
                                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold mr-3 ${stage.color.replace('bg-', 'bg-')}`}>
                                    {candidate.avatar}
                                  </div>
                                  <div>
                                    <h5 className="font-semibold text-gray-900">{candidate.name}</h5>
                                    <p className="text-xs text-gray-500">{candidate.jobTitle}</p>
                                  </div>
                                </div>
                                <button className="text-gray-400 hover:text-gray-600" title="View Candidate Details">
                                  <Users className="w-4 h-4" /> {/* Using Users icon as a placeholder for details */}
                                </button>
                              </div>
                              <div className="flex items-center justify-between text-xs text-gray-500 mt-2 pt-2 border-t">
                                <div className="flex items-center space-x-2">
                                  {candidate.resume && <FileText className="w-3 h-3" />}
                                  {candidate.notes && <Clipboard className="w-3 h-3" />}
                                </div>
                                <button className="text-blue-500 hover:underline" onClick={() => handleOpenModal(candidate)}>
                                  Schedule Interview
                                </button>
                              </div>
                            </div>
                          )}
                        </Draggable>
                      ))}
                    {provided.placeholder}
                  </div>
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>
      {/* Render the InterviewScheduler modal */}
      {selectedCandidate && (
        <InterviewScheduler
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          candidateName={selectedCandidate.name}
          jobTitle={selectedCandidate.jobTitle}
          onSchedule={handleScheduleInterviewFromPipeline} // Pass the handler here
        />
      )}
    </div>
  );
};

export default CandidatePipeline;

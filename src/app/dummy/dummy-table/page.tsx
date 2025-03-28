'use client';

import { Title } from '@/components/ui/title';
import { Input } from '@/components/input';
import { ResumeTable } from '@/components/table';

const candidates = 
[
  { id: 'asdf1', name: 'M***** J*** D****', resume: 'https://bitcoin.org/bitcoin.pdf', location: 'Matandang Balara, Quezon City', fields: { skills: 'cooking, rearing' } , bestMatch: true },
  { id: 'asdf2', name: 'M**** J*** D****', resume: 'https://bitcoin.org/bitcoin.pdf', location: 'Matandang Balara, Quezon City', fields: { skills: 'cooking, rearing' } , bestMatch: true },
  { id: 'asdf3', name: 'M*** J*** D****', resume: 'https://bitcoin.org/bitcoin.pdf', location: 'Matandang Balara, Quezon City', fields: { skills: 'cooking, rearing' } , bestMatch: true },
  { id: 'asdf4', name: 'B*** R*** O****', resume: 'https://bitcoin.org/bitcoin.pdf', location: 'Matandang Balara, Quezon City', fields: { skills: 'cooking, cleaning' }  },
  { id: 'asdf5', name: 'Y**** E*** S****', resume: 'https://bitcoin.org/bitcoin.pdf', location: 'Loyola Heights, Quezon City', fields: { skills: 'cleaning, rearing' }  },
  { id: 'asdf6', name: 'H** A****** H****', resume: 'https://bitcoin.org/bitcoin.pdf', location: 'Tandang Sora, Quezon City', fields: { skills: 'cooking, dishwashing' }  },
  { id: 'asdf7', name: 'S*** S***** S********', resume: 'https://bitcoin.org/bitcoin.pdf', location: 'Matandang Balara, Quezon City', fields: { skills: 'rearing, tutoring' }  },
  { id: 'asdf8', name: 'C**** A** T**', resume: 'https://bitcoin.org/bitcoin.pdf', location: 'Tandang Sora, Quezon City', fields: { skills: 'cleaning, laundry' }  },
  { id: 'asdf9', name: 'C*** R*** O****', resume: 'https://bitcoin.org/bitcoin.pdf', location: 'Matandang Balara, Quezon City', fields: { skills: 'cooking, cleaning' }  },
  { id: 'asdf10', name: 'C**** E*** S****', resume: 'https://bitcoin.org/bitcoin.pdf', location: 'Loyola Heights, Quezon City', fields: { skills: 'cleaning, rearing' }  },
  { id: 'asdf11', name: 'C** A****** H****', resume: 'https://bitcoin.org/bitcoin.pdf', location: 'Tandang Sora, Quezon City', fields: { skills: 'cooking, dishwashing' }  },
  { id: 'asdf12', name: 'C*** S***** S********', resume: 'https://bitcoin.org/bitcoin.pdf', location: 'Matandang Balara, Quezon City', fields: { skills: 'rearing, tutoring' }  },
  { id: 'asdf13', name: 'D**** A** T**', resume: 'https://bitcoin.org/bitcoin.pdf', location: 'Tandang Sora, Quezon City', fields: { skills: 'cleaning, laundry' }  },
  { id: 'asdf14', name: 'D*** R*** O****', resume: 'https://bitcoin.org/bitcoin.pdf', location: 'Matandang Balara, Quezon City', fields: { skills: 'cooking, cleaning' }  },
  { id: 'asdf15', name: 'D**** E*** S****', resume: 'https://bitcoin.org/bitcoin.pdf', location: 'Loyola Heights, Quezon City', fields: { skills: 'cleaning, rearing' }  },
  { id: 'asdf16', name: 'D** A****** H****', resume: 'https://bitcoin.org/bitcoin.pdf', location: 'Tandang Sora, Quezon City', fields: { skills: 'cooking, dishwashing' }  },
  { id: 'asdf17', name: 'D*** S***** S********', resume: 'https://bitcoin.org/bitcoin.pdf', location: 'Matandang Balara, Quezon City', fields: { skills: 'rearing, tutoring' }  },
  { id: 'asdf18', name: 'E**** A** T**', resume: 'https://bitcoin.org/bitcoin.pdf', location: 'Tandang Sora, Quezon City', fields: { skills: 'cleaning, laundry' }  },
]


export default function Dummy() {
  return (
    <main className="min-h-screen bg-[#1A1A1A] text-white flex flex-col items-center justify-center p-4">
      {/* Logo */}
      <Title />

      <ResumeTable resumes={candidates} columns={['one', 'two', 'three']} />


      {/* Contact info */}
      <div className="text-center text-sm text-gray-400">
        Questions or concerns? Call us at:<br />
        <span className="font-medium text-white">09620900909</span>
      </div>
    </main>
  );
}

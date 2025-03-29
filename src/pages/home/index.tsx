import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { Heading } from '@/components/ui/heading';

const HomePage = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100">
            <Container className="flex flex-col items-center justify-center text-center p-8 bg-white rounded-lg shadow-xl max-w-2xl">
                <Heading size="h1" className="mb-4 text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
                    Welcome to the Online Exam Portal
                </Heading>
                <p className="mb-6 text-lg text-gray-700">
                    Test your knowledge and skills with our comprehensive online exams.
                </p>
                <div className="flex space-x-6 mb-8">
                    <Link to="/signup">
                        {/* Use a prominent color for the primary action */}
                        <Button color="green" className="px-6 py-3 text-lg">Signup</Button>
                    </Link>
                    <Link to="/login">
                        {/* Use the default color for the secondary action */}
                        <Button className="px-6 py-3 text-lg">Login</Button>
                    </Link>
                </div>
                <p className="text-sm text-gray-500">
                    Developed by Roshan
                </p>
            </Container>
        </div>
    );
};

export default HomePage;
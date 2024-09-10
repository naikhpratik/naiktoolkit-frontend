import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer style={styles.footer}>
      <p>&copy; 2024 Tasky. All rights reserved.</p>
    </footer>
  );
};

const styles = {
  footer: {
    textAlign: 'center' as const,
    padding: '1rem',
    backgroundColor: '#f5f5f5',
    marginTop: 'auto',
  },
};

export default Footer;
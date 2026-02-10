import { motion } from "framer-motion";
import { Leaf } from "lucide-react";

const ProcessingSpinner = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="flex flex-col items-center gap-4 py-8"
  >
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
      className="rounded-full bg-primary/10 p-5"
    >
      <Leaf className="h-8 w-8 text-primary" />
    </motion.div>
    <div className="text-center">
      <p className="font-semibold">Analyzing your crop image…</p>
      <p className="text-sm text-muted-foreground">This may take a few moments</p>
    </div>
  </motion.div>
);

export default ProcessingSpinner;

import CodeBlock from "~/components/ui/code-block";
import AlertBox from "~/components/ui/alert-box";
import NotificationChannels from "./notification-channels";
import { DocContent } from "~/constants/docs";

interface DocContentProps {
  content: DocContent;
}

export default function DocContentComponent({ content }: DocContentProps) {
  return (
    <article className="prose prose-lg max-w-none">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">{content.title}</h1>
      <p className="text-xl text-gray-600 mb-8">{content.description}</p>
      {content.alerts?.map((alert, index) => (
        <AlertBox
          key={index}
          type={alert.type}
          title={alert.title}
          content={alert.content}
        />
      ))}
      {content.sections.map((section, sectionIndex) => (
        <div key={sectionIndex}>
          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-6">
            {section.title}
          </h2>
          
          {section.content && (
            <p className="text-gray-700 mb-6">{section.content}</p>
          )}
          {section.sections?.map((subSection, subIndex) => (
            <div key={subIndex} className="mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">
                {subSection.title}
              </h3>
              
              {subSection.content && (
                <p className="text-gray-700 mb-4">{subSection.content}</p>
              )}
              {subSection.codeBlocks?.map((codeBlock, codeIndex) => (
                <CodeBlock
                  key={codeIndex}
                  language={codeBlock.language}
                  code={codeBlock.code}
                  title={codeBlock.title}
                />
              ))}
              {subSection.lists && (
                <ul className="list-disc pl-6 mb-6 space-y-2">
                  {subSection.lists.map((item, itemIndex) => (
                    <li key={itemIndex} className="text-gray-700">{item}</li>
                  ))}
                </ul>
              )}
              {subSection.gridItems && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  {subSection.gridItems.map((item, itemIndex) => (
                    <div key={itemIndex} className="bg-gray-50 p-6 rounded-lg">
                      <h4 className="font-semibold text-gray-900 mb-3">
                        {item.title}
                      </h4>
                      <p className="text-sm text-gray-600">{item.description}</p>
                    </div>
                  ))}
                </div>
              )}
              {subSection.additionalContent && (
                <p className="text-gray-700 mb-6">{subSection.additionalContent}</p>
              )}
            </div>
          ))}
          {section.alerts?.map((alert, alertIndex) => (
            <AlertBox
              key={alertIndex}
              type={alert.type}
              title={alert.title}
              content={alert.content}
            />
          ))}
          {section.title === "Alerting and Notifications" && (
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">
                Notification Channels
              </h3>
              <p className="text-gray-700 mb-4">Configure multiple notification channels:</p>
              <NotificationChannels />
            </div>
          )}
          {section.title === "Best Practices" && section.sections && (
            <div className="space-y-6 mb-8">
              {section.sections.map((practice, practiceIndex) => (
                <div key={practiceIndex} className="flex items-start space-x-4">
                  <div className="w-6 h-6 flex items-center justify-center mt-1 bg-blue-600 text-white rounded-full text-sm font-bold">
                    {practiceIndex + 1}
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">
                      {practice.title}
                    </h4>
                    <p className="text-gray-700">{practice.content}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
          {section.title === "Troubleshooting Common Issues" && section.sections && (
            <div className="space-y-6 mb-12">
              {section.sections.map((issue, issueIndex) => (
                <div key={issueIndex} className="border border-gray-200 rounded-lg p-6">
                  <h4 className="font-semibold text-gray-900 mb-3">
                    {issue.title}
                  </h4>
                  <p className="text-gray-700 mb-3">{issue.content}</p>
                  {issue.lists && (
                    <ul className="list-disc pl-6 text-gray-700 space-y-1">
                      {issue.lists.map((item, itemIndex) => (
                        <li key={itemIndex}>{item}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </article>
  );
} 